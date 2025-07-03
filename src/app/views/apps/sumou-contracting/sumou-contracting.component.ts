import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleComponent } from '@component/page-title.component';
import { ContractingService } from '@core/services/contracting/contracting.service';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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
  ],
  templateUrl: './sumou-contracting.component.html',
  styleUrl: './sumou-contracting.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SumouContractingComponent {
  private readonly _ContractingService = inject(ContractingService)

  mainImageData: { file: File; previewUrl: string | null } | null = null;
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

  // Contracting Image
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

  // Submit Form Contracting
  submitContractingData():void{
    let formData = new FormData
    formData.append('Description', this.description)
    if (this.mainImageData) {
      formData.append('File', this.mainImageData?.file);
    }

    this._ContractingService.CreateContracting(formData).subscribe({
      next:(res)=>{
        this.GetAllContracting()
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
  patchContractingData(contracting:any):void{
    this.contractingId = contracting.id
    this._ContractingService.GetContractingById(this.contractingId).subscribe({
      next:(res)=>{
        this.description = res.data.description,
        this.mainImageData = res.data.fileUrl
        this.update = true
      }
    })
  }

  // Update Contracting
  UpdateContracting():void{
    let formData = new FormData
    formData.append('Id', this.contractingId)
    formData.append('Description', this.description)
    if (this.mainImageData) {
      formData.append('File', this.mainImageData?.file);
    }

    this._ContractingService.UpdateContracting(formData).subscribe({
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
        this.contractingId = null
        this.update = false
        this.GetAllContracting()
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
