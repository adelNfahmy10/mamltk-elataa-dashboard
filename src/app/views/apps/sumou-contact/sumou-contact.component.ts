import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleComponent } from '@component/page-title.component';
import { ContactService } from '@core/services/contact/contact.service';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sumou-contact',
  standalone: true,
  imports: [
    PageTitleComponent,
    FormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sumou-contact.component.html',
  styleUrl: './sumou-contact.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SumouContactComponent {
private readonly _ContactService = inject(ContactService)
 private readonly _FormBuilder = inject(FormBuilder)

  allContact:any[] = []
  contactId:number | null = null
  update:boolean = false

  ngOnInit(): void {
    this.GetAllContacts()
  }

  GetAllContacts():void{
    this._ContactService.GetAllContacts().subscribe({
      next:(res)=>{
        this.allContact = res.data
        this.totalItems = this.allContact.length
      }
    })
  }

  contactForm:FormGroup = this._FormBuilder.group({
    whatsapp:[''],
    phoneNumber:[''],
    email:[''],
    address:[''],
    facebookUrl:[''],
    twitterUrl:[''],
    linkedInUrl:[''],
    instagramUrl:[''],
  })

  submitContactForm():void{
    let data = this.contactForm.value

    this._ContactService.CreateContact(data).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Good job!',
          text: 'Create Contact Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
        this.GetAllContacts()
        this.contactForm.reset()
      }
    })
  }

  DeleteContact(id:number):void{
    this._ContactService.DeleteContact(id).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Good job!',
          text: 'Delete Contact Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
        this.GetAllContacts()
      }
    })
  }

  patchContactData(config:any):void{
    this.contactId = config.id
    this._ContactService.GetContactById(config.id).subscribe({
      next:(res)=>{
        this.contactForm.patchValue(res.data)
        this.update = true
      }
    })
  }

  UpdateContact():void{
    let data = this.contactForm.value
    data.id = this.contactId

    this._ContactService.UpdateContact(data).subscribe({
      next:(res)=>{
        Swal.fire({
          title: 'Good job!',
          text: 'Update Contact Is Success!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
        this.GetAllContacts()
        this.contactForm.reset()
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
    return this.allContact.slice(start, end);
  }
}
