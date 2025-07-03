import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleComponent } from '@component/page-title.component';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sumou-configuration',
  standalone: true,
  imports: [
    PageTitleComponent,
    FormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sumou-configuration.component.html',
  styleUrl: './sumou-configuration.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SumouConfigurationComponent {
 private readonly _ConfigurationService = inject(ConfigurationService)
 private readonly _FormBuilder = inject(FormBuilder)

  allConfiguration:any[] = []
  configurationId:number | null = null
  update:boolean = false

  ngOnInit(): void {
    this.GetAllConfigurations()
  }

  GetAllConfigurations():void{
    this._ConfigurationService.GetAllConfigurations().subscribe({
      next:(res)=>{
        this.allConfiguration = res.data
        this.totalItems = this.allConfiguration.length
      }
    })
  }

  configForm:FormGroup = this._FormBuilder.group({
    email:[''],
    phoneNumber:[''],
  })

  submitConfigForm():void{
    let data = this.configForm.value

    this._ConfigurationService.CreateConfiguration(data).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Good job!',
          text: 'Create Configuration Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
        this.GetAllConfigurations()
        this.configForm.reset()
      }
    })
  }

  DeleteConfiguration(id:number):void{
    this._ConfigurationService.DeleteConfiguration(id).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Good job!',
          text: 'Delete Configuration Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
        this.GetAllConfigurations()
      }
    })
  }

  patchConfigurationData(config:any):void{
    this.configurationId = config.id
    this._ConfigurationService.GetConfigurationById(config.id).subscribe({
      next:(res)=>{
        this.configForm.patchValue(res.data)
        this.update = true
      }
    })
  }

  UpdateConfiguration():void{
    let data = this.configForm.value
    data.id = this.configurationId

    this._ConfigurationService.UpdateConfiguration(data).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Good job!',
          text: 'Update About Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
        this.GetAllConfigurations()
        this.configForm.reset()
        this.update = false
      }
    })
  }


  currentPage = 1;
  pageSize = 10;
  totalItems!:number
  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allConfiguration.slice(start, end);
  }
}
