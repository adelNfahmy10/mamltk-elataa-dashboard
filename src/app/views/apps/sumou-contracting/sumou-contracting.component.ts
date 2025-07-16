import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleComponent } from '@component/page-title.component';
import { ContractingService } from '@core/services/contracting/contracting.service';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@Component({
  selector: 'app-sumou-contracting',
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
  templateUrl: './sumou-contracting.component.html',
  styleUrl: './sumou-contracting.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class SumouContractingComponent {
  private readonly _ContractingService = inject(ContractingService)

  allContracting:any[] = []
  description:string = ''
  contractingId:any= null
  contractingDataById:any= null
  update:boolean = false

  ngOnInit(): void {
    this.GetAllContracting()
  }

  GetAllContracting():void{
    this._ContractingService.GetAllContracting().subscribe({
      next:(res)=>{
        this.allContracting = res.data
        this.totalItems = this.allContracting.length
      }
    })
  }

  // Main Header Images
  uploadedMainHeaderFiles: any[] = []
  imageURL: string = ''
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
    maxFiles: 1,
    acceptedFiles: 'image/*',
    dictDefaultMessage: ''
  };

  // Upload Files
  onUploadSuccess(event: any): void {
    console.log('Success:', event[0]);
    this.uploadedMainHeaderFiles.push(event[0])
  }

  // File Remove
  onDropzoneInit(dropzone: any): void {
    this.dropzoneRef = dropzone;
  }

  removeFile() {
    this.uploadedMainHeaderFiles = []
    if (this.dropzoneRef && this.dropzoneRef.files.length > 0) {
      const dzFile = this.dropzoneRef.files[0];
      this.dropzoneRef.removeFile(dzFile);
    }
  }

  // Submit Form Contracting
  submitContractingData():void{
    let data = {
      Description: this.description,
      File: this.uploadedMainHeaderFiles[0],
    }

    let formData = new FormData
    formData.append('Description', data.Description)
    formData.append('File', data.File)


    this._ContractingService.CreateContracting(formData).subscribe({
      next:(res)=>{
        this.GetAllContracting();
        this.description = '';
        this.uploadedMainHeaderFiles = [];
        this.dropzoneRef.removeAllFiles();
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

  // Delete Contracting
  DeleteContracting(id:number):void{
    this._ContractingService.DeleteContracting(id).subscribe({
      next:(res)=>{
        this.GetAllContracting()
        Swal.fire({
          title: 'Good job!',
          text: 'Delete Contracting Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
      }
    })
  }

  // Patch Data Contracting
  patchContractingData(contracting: any): void {
    this.contractingId = contracting.id;

    this._ContractingService.GetContractingById(this.contractingId).subscribe({
      next: (res) => {
        const data = res.data;
        this.description = data.description;
        this.uploadedMainHeaderFiles[0] = data.fileUrl
        this.update = true;
      }
    });
  }

  // Update Contracting
  UpdateContracting():void{
    let data = {
      Id : this.contractingId,
      Description : this.description,
      File : this.uploadedMainHeaderFiles[0]
    }

    console.log(data);

    let formData = new FormData
    formData.append('Id', this.contractingId)
    formData.append('Description', this.description)
    formData.append('File', this.uploadedMainHeaderFiles[0])

    this._ContractingService.UpdateContracting(formData).subscribe({
      next:(res)=>{
        this.GetAllContracting();
        this.description = '';
        this.uploadedMainHeaderFiles = [];
        this.dropzoneRef.removeAllFiles();
        Swal.fire({
          title: 'Good job!',
          text: 'Update Contracting Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
      }
    })
  }

  // Pagination Contracting
  currentPage = 1;
  pageSize = 10;
  totalItems!:number
  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allContracting.slice(start, end);
  }

}
