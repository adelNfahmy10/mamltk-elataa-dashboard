import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviousInvestmentsService } from '@core/services/previousInvestments/previous-investments.service';
import { NgbDropdownModule, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { PageTitleComponent } from "@component/page-title.component";
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from "ngx-dropzone-wrapper";
import { QuillEditorComponent } from "ngx-quill";

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@Component({
  selector: 'app-sumou-previous-investments',
  standalone: true,
  imports: [
    PageTitleComponent,
    FormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    DropzoneModule,
    QuillEditorComponent,
    ReactiveFormsModule
],
  templateUrl: './sumou-previous-investments.component.html',
  styleUrl: './sumou-previous-investments.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})


export class SumouPreviousInvestmentsComponent {
  private readonly _PreviousInvestmentsService = inject(PreviousInvestmentsService)
  private readonly _FormBuilder = inject(FormBuilder)
  private modalService = inject(NgbModal)

  allPreviousInvestments:any[] = []
  description:string = ''
  previousInvestmentId:any= null
  InvestmentsData!:any
  update:boolean = false

  ngOnInit(): void {
    this.GetAllPreviousInvestments()
  }

  GetAllPreviousInvestments():void{
    this._PreviousInvestmentsService.GetAllPreviousInvestments().subscribe({
      next:(res)=>{
        this.allPreviousInvestments = res.data
        this.totalItems = this.allPreviousInvestments.length
      }
    })
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, id:number) {
    this.modalService.open(content, options)
  }

  getInvestmentDataById(id:number):void{
    this._PreviousInvestmentsService.GetPreviousInvestmentsById(id).subscribe({
      next:(res)=>{
        this.InvestmentsData = res.data
      }
    })
  }

  // Main Header Images
  uploadedMainHeaderFiles: any[] = []
  dropzoneRef: any = null;
  dropzoneMsg = ` <div class="dz-message needsclick">
                      <i class="ri-upload-cloud-2-line fs-48 text-success"></i>
                      <h3>أسقط صورك هنا أو <span class="text-success">انقر للتصفح</span></h3>
                      <span class="text-muted fs-13">
                          يُفضل استخدام أبعاد 1600 × 1200 (4:3). الملفات المسموح بها: PNG، JPG، وGIF
                      </span>
                  </div>
              `
  customDropzoneConfig: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFilesize: 10,
    acceptedFiles: 'image/*',
    dictDefaultMessage: ''
  };

  // Upload Files
  onUploadSuccess(event: any): void {
    console.log('Success:', event[0]);
    this.uploadedMainHeaderFiles.push({
      type: 1,
      image: event[0]
    })
  }

  // File Remove
  onDropzoneInit(dropzone: any): void {
    this.dropzoneRef = dropzone;
  }

  removeFile(index: number) {
    const removedFile = this.uploadedMainHeaderFiles[index].image;
    this.uploadedMainHeaderFiles.splice(index, 1);
    if (this.dropzoneRef) {
      const dzFile = this.dropzoneRef.files.find((f: any) => f.name === removedFile.name);
      if (dzFile) {
        this.dropzoneRef.removeFile(dzFile);
      }
    }
  }

  investmentForm:FormGroup = this._FormBuilder.group({
    Title:[''],
    Description:[''],
    investmentImages:this._FormBuilder.array([])
  })


  // Submit Form PreviousInvestments
  submitPreviousInvestmentData():void{
    let data = this.investmentForm.value
    data.investmentImages = this.uploadedMainHeaderFiles

    console.log(data);


    let formData = new FormData
    formData.append('Title', data.Title)
    formData.append('Description', data.Description)
    this.uploadedMainHeaderFiles.forEach((img, index)=>{
      formData.append(`investmentImages[${index}].type`, img.type),
      formData.append(`investmentImages[${index}].image`, img.image)
    })

    this._PreviousInvestmentsService.CreatePreviousInvestments(formData).subscribe({
      next:(res)=>{
        this.GetAllPreviousInvestments();
        this.investmentForm.reset()
        this.uploadedMainHeaderFiles = [];
        if (this.dropzoneRef) this.dropzoneRef.removeAllFiles();
        Swal.fire({
          title: 'تم تسجيل بيانات الاستثمار السابق بنجاح',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
      }
    })
  }

  // Delete PreviousInvestments
  DeletePreviousInvestments(id:number):void{
    this._PreviousInvestmentsService.DeletePreviousInvestments(id).subscribe({
      next:(res)=>{
        this.GetAllPreviousInvestments()
        Swal.fire({
          title: 'تم حذف  بيانات الاستثمار السابق بنجاح',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
      }
    })
  }

  // Patch Data PreviousInvestments
  patchPreviousInvestmentsData(investment:any):void{
    this.previousInvestmentId = investment.id;

    this._PreviousInvestmentsService.GetPreviousInvestmentsById(this.previousInvestmentId).subscribe({
      next: (res) => {
        const data = res.data;
        this.description = data.description;

        this.uploadedMainHeaderFiles = data.images.map((img: any) => ({
          id: img.id,
          type: img.type,
          image: img.image,
        }));

        this.update = true;
      }
    });
  }

  // Update PreviousInvestments
  UpdatePreviousInvestments():void{
    const formData = new FormData();
    formData.append('Id', this.previousInvestmentId);
    formData.append('Description', this.description);

    this.uploadedMainHeaderFiles.forEach((img, index) => {
      formData.append(`investmentImages[${index}].Id`, img.id || 0);
      formData.append(`investmentImages[${index}].type`, img.type);
      formData.append(`investmentImages[${index}].image`, img.image);
    });

    this._PreviousInvestmentsService.UpdatePreviousInvestments(formData).subscribe({
      next: () => {
        this.GetAllPreviousInvestments();
        this.description = '';
        this.uploadedMainHeaderFiles = [];
        this.previousInvestmentId = null;
        this.update = false;
        if (this.dropzoneRef) this.dropzoneRef.removeAllFiles();

        Swal.fire({
          title: 'تم تعديل بيانات الاستثمار السابق بنجاح.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        });
      }
    });
  }

  // Pagination PreviousInvestments
  currentPage = 1;
  pageSize = 10;
  totalItems!:number
  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allPreviousInvestments.slice(start, end);
  }

  editorConfig = {
    toolbar: [
      [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ align: [] }],

      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  editorConfigBubble = {
    toolbar: [
      ['bold', 'italic', 'link', 'blockquote'],
      [{ header: 1 }, { header: 2 }],
    ],
  }
}
