import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreviousInvestmentsService } from '@core/services/previousInvestments/previous-investments.service';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { PageTitleComponent } from "@component/page-title.component";
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from "ngx-dropzone-wrapper";
import { ContractingService } from '@core/services/contracting/contracting.service';

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
      DropzoneModule
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

  mainImageData: { file: File; previewUrl: string | null } | null = null;
  allPreviousInvestments:any[] = []
  description:string = ''
  previousInvestmentId:any= null
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

  // Project Image
  handleMainImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const selected = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.mainImageData = {
          file: selected,
          previewUrl: e.target.result
        };
      };

      reader.readAsDataURL(selected);
      input.value = '';
    }
  }
  clearMainImage(): void {
    this.mainImageData = null;
  }

  // Submit Form PreviousInvestments
  submitPreviousInvestmentData():void{
    console.log(this.uploadedMainHeaderFiles);
    console.log(this.description);



    let formData = new FormData
    formData.append('Description', this.description)
    this.uploadedMainHeaderFiles.forEach((img, index)=>{
      formData.append(`investmentImages[${index}].type`, img.type),
      formData.append(`investmentImages[${index}].image`, img.image)
    })
    
    this._PreviousInvestmentsService.CreatePreviousInvestments(formData).subscribe({
      next:(res)=>{
        this.GetAllPreviousInvestments()
        this.description = ''
        this.mainImageData = null
        Swal.fire({
          title: 'Good job!',
          text: 'Create Contracting Is Success!',
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
          title: 'Good job!',
          text: 'Delete PreviousInvestments Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
      }
    })
  }

  // Patch Data PreviousInvestments
  patchPreviousInvestmentsData(contracting:any):void{
    this.previousInvestmentId = contracting.id
    this._PreviousInvestmentsService.GetPreviousInvestmentsById(this.previousInvestmentId).subscribe({
      next:(res)=>{
        this.description = res.data.description,
        this.mainImageData = res.data.fileUrl
        this.update = true
      }
    })
  }

  // Update PreviousInvestments
  UpdatePreviousInvestments():void{
    let formData = new FormData
    formData.append('Id', this.previousInvestmentId)
    formData.append('Description', this.description)
    if (this.mainImageData) {
      formData.append('File', this.mainImageData?.file);
    }

    this._PreviousInvestmentsService.UpdatePreviousInvestments(formData).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Good job!',
          text: 'Update Contracting Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
        this.description = ''
        this.mainImageData = null
        this.previousInvestmentId = null
        this.update = false
        this.GetAllPreviousInvestments()
      }
    })
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
}
