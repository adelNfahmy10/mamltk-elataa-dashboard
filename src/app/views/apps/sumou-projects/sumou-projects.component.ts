import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, TemplateRef } from '@angular/core';
import { PageTitleComponent } from '@component/page-title.component';
import { NgbDropdownModule, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive';
import { ProjectsService } from '@core/services/projects/projects.service';
import { IProject, projectData } from './dat';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sumou-projects',
  standalone: true,
  imports: [
    FormsModule,
    PageTitleComponent,
    NgbDropdownModule,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    SelectFormInputDirective
  ],
  templateUrl: './sumou-projects.component.html',
  styleUrl: './sumou-projects.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SumouProjectsComponent implements OnInit{
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ProjectsService = inject(ProjectsService)
    private modalService = inject(NgbModal)

  allProjects:IProject[] = []
  selectedProjectById: IProject | null = null;
  images: { id?:any, file: File, url: string, title: string, description: string, picture?:string }[] = [];
  mainImageData: { file: File; previewUrl: string | null } | null = null;
  projectId:any;
  update:boolean = false

  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects():void{
    this._ProjectsService.getAllProjects().subscribe({
      next:(res)=>{
        this.allProjects = res.data
        this.totalItems = this.allProjects.length;
      }
    })
  }

  getProjectDataById(id: number): void {
    this._ProjectsService.getPorjectById(id).subscribe({
      next:(res)=>{
        this.selectedProjectById = res.data
      }
    })
  }


  // Header Image
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

  // Prjects Images And Info
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);

      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({
            file,
            url: e.target.result,
            title: '',
            description: ''
          });
        };
        reader.readAsDataURL(file);
        console.log(this.images);

      }

      input.value = '';
    }
  }
  removeImage(index: number, id:number): void {
    this.images.splice(index, 1);
  }


  // Projects Form
  projectForm:FormGroup = this._FormBuilder.group({
    Title: [''],
    Description: [''],
    Price: [''],
    Location: [''],
    City: [''],
    RoomNumbers: [''],
    Area: [''],
    Type: [''],
    MainPicture: [''],
    Objects: [''],
  })

  // Submit Project Form
  submitProjectForm():void{
    let data = this.projectForm.value
    data.MainPicture = this.mainImageData?.file
    data.Objects = this.images

    const formData = new FormData();
    formData.append('Title', data.Title);
    formData.append('Description', data.Description);
    formData.append('Price', data.Price);
    formData.append('Location', data.Location);
    formData.append('City', data.City);
    formData.append('RoomNumbers', data.RoomNumbers);
    formData.append('Area', data.Area);
    formData.append('Type', data.Type);
    if (this.mainImageData) {
      formData.append('MainPicture', this.mainImageData.file);
    }
    data.Objects.forEach((img:any, index:any) => {
      formData.append(`Objects[${index}].picture`, img.file);
      formData.append(`Objects[${index}].title`, img.title);
      formData.append(`Objects[${index}].description`, img.description);
    });

    this._ProjectsService.createNewProject(formData).subscribe({
      next:(res)=>{
        console.log(res);
        this.getAllProjects()
        this.projectForm.reset()
        this.mainImageData = null
        this.images = []
        Swal.fire({
          title: 'Good job!',
          text: 'Create Project Is Successed!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
        })
      }
    })

  }

  deleteProject(id:number):void{
    this._ProjectsService.deleteProject(id).subscribe({
      next:(res)=>{
        this.getAllProjects()
        Swal.fire({
          title: 'Good job!',
          text: 'Delete Project Is Successed!',
          icon: 'success',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
            cancelButton: 'btn btn-danger w-xs mt-2',
          },
          buttonsStyling: false,
          showCloseButton: false,
        })
      }
    })
  }

  patchProjectData(project:any):void{
    this.projectId = project.id
    this._ProjectsService.getPorjectById(this.projectId).subscribe({
      next:(res)=>{
        this.projectForm.patchValue({
          Title: res.data.title,
          Description: res.data.description,
          Price: res.data.price,
          Location: res.data.location,
          City: res.data.city,
          RoomNumbers: res.data.roomNumbers,
          Area: res.data.area,
          Type: res.data.type
        })
        this.mainImageData = res.data.mainPicture
        this.images = res.data.projectDetails
        this.update = true
          console.log(this.images);
      }
    })
  }

  updateProject():void{
    let data = this.projectForm.value
    data.MainPicture = this.mainImageData?.file
    data.Objects = this.images

    const formData = new FormData();
    formData.append('Id', this.projectId);
    formData.append('Title', data.Title);
    formData.append('Description', data.Description);
    formData.append('Price', data.Price);
    formData.append('Location', data.Location);
    formData.append('City', data.City);
    formData.append('RoomNumbers', data.RoomNumbers);
    formData.append('Area', data.Area);
    formData.append('Type', data.Type);
    if (this.mainImageData) {
      formData.append('MainPicture', this.mainImageData.file);
    }
    data.Objects.forEach((img:any, index:any) => {
      formData.append(`Objects[${index}].picture`, img.file);
      formData.append(`Objects[${index}].title`, img.title);
      formData.append(`Objects[${index}].description`, img.description);
    });


    this._ProjectsService.UpdateProject(formData).subscribe({
      next:(res)=>{
        this.images = []
        this.mainImageData = null
        this.getAllProjects()
        this.update = false
        Swal.fire({
          title: 'Good job!',
          text: 'Update Project Is Successed!',
          icon: 'success',
          showCancelButton: true,
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
            cancelButton: 'btn btn-danger w-xs mt-2',
          },
          buttonsStyling: false,
          showCloseButton: false,
        })
      }
    })
  }

  currentPage = 1;
  pageSize = 10;
  totalItems!:number
  get pagedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.allProjects.slice(start, end);
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions, id:number) {
    this.modalService.open(content, options)
    this.getProjectDataById(id)
  }

}
