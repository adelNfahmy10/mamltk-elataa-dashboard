import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { PageTitleComponent } from "../../../components/page-title.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutService } from '@core/services/about/about.service';
import Swal from 'sweetalert2';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sumou-about',
  standalone: true,
  imports: [
    PageTitleComponent,
    FormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sumou-about.component.html',
  styleUrl: './sumou-about.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SumouAboutComponent implements OnInit{
  private readonly _AboutService = inject(AboutService)

  description:string = ''
  aboutDescriptionId:number | null = null
  update:boolean = false
  allAboutUsDescritions:any[] = []

  ngOnInit(): void {
    this.getAllAboutUsDescritions()
  }

  getAllAboutUsDescritions():void{
    this._AboutService.GetAllAboutUs().subscribe({
      next:(res)=>{
        this.allAboutUsDescritions = res.data
      }
    })
  }

  submitAbout():void{
    let data = {
      description: this.description
    }

    this._AboutService.CreateAboutUs(data).subscribe({
      next:(res)=>{
        this.getAllAboutUsDescritions()
        this.description = ''
        Swal.fire({
          title: 'Good job!',
          text: 'Create About Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
      }
    })
  }

  deleteAboutDesc(id:number):void{
    this._AboutService.DeleteAboutUs(id).subscribe({
      next:(res)=>{
        this.getAllAboutUsDescritions()
        Swal.fire({
          title: 'Good job!',
          text: 'Delete About Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
      }
    })
  }

  patchAboutUsData(aboutDec:any):void{
    this.aboutDescriptionId = aboutDec.id
    this.description = aboutDec.description
    this.update = true
  }

  updateAboutDescrition():void{
    let data = {
      id: this.aboutDescriptionId,
      description: this.description
    }

    this._AboutService.UpdateAboutUs(data).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Good job!',
          text: 'Update About Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
        this.description = ''
        this.aboutDescriptionId = null
        this.update = false
        this.getAllAboutUsDescritions()
      }
    })
  }


  currentPage = 1;
  pageSize = 10;
  totalItems!:number
  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allAboutUsDescritions.slice(start, end);
  }


}
