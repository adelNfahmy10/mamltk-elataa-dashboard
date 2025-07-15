import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, TemplateRef } from '@angular/core';
import { PageTitleComponent } from '@component/page-title.component';
import { NgbDropdownModule, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive';
import { ProjectsService } from '@core/services/projects/projects.service';
import { IProject } from './dat';
import Swal from 'sweetalert2';
import { DropzoneModule,DROPZONE_CONFIG,DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import { NewLinePipe } from '@core/pips/newLine/new-line.pipe';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


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
    SelectFormInputDirective,
    DropzoneModule,
    NewLinePipe
  ],
  templateUrl: './sumou-projects.component.html',
  styleUrl: './sumou-projects.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]

})

export class SumouProjectsComponent implements OnInit{
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ProjectsService = inject(ProjectsService)
  private modalService = inject(NgbModal)

  allProjects:IProject[] = []
  selectedProjectById: IProject | null = null;
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

  GetAllOwnershipProjects():void{
    this._ProjectsService.GetAllOwnershipProjects().subscribe({
      next:(res)=>{
        this.allProjects = res.data
        this.totalItems = this.allProjects.length;
      }
    })
  }

  GetAllRealEstateOffers():void{
    this._ProjectsService.GetAllRealEstateOffers().subscribe({
      next:(res)=>{
        this.allProjects = res.data
        this.totalItems = this.allProjects.length;
      }
    })
  }

  firstMainPic:any
  getProjectDataById(id: number): void {
    this._ProjectsService.getPorjectById(id).subscribe({
      next:(res)=>{
        this.selectedProjectById = res.data
          if (this.selectedProjectById?.projectDetails?.length) {
            this.firstMainPic = this.selectedProjectById.projectDetails[0].picture;
          };
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
    this.uploadedMainHeaderFiles.push({
      type:1,
      picture : event[0]
    })
  }

  // File Remove
  onDropzoneInit(dropzone: any): void {
    this.dropzoneRef = dropzone;

  }

  removeFile(index: number) {
    const removedFile = this.uploadedMainHeaderFiles[index].picture;
    this.uploadedMainHeaderFiles.splice(index, 1);
    if (this.dropzoneRef) {
      const dzFile = this.dropzoneRef.files.find((f: any) => f.name === removedFile.name);
      if (dzFile) {
        this.dropzoneRef.removeFile(dzFile);
      }
    }
  }

  // Projects Images
  uploadedProjectFiles: any[] = []
  dropzoneProjectRef: any = null;

  // Upload Files
  onUploadProjectSuccess(event: any): void {
    this.uploadedProjectFiles.push({
      type:2,
      picture : event[0]
    })
  }

  // File Remove
  onDropzoneProjectInit(dropzone: any): void {
    this.dropzoneProjectRef = dropzone;
  }

  removeProjectFile(index: number) {
    const removedFile = this.uploadedProjectFiles[index].picture;
    this.uploadedProjectFiles.splice(index, 1);
    if (this.dropzoneProjectRef) {
      const dzFile = this.dropzoneProjectRef.files.find((f: any) => f.name === removedFile.name);
      if (dzFile) {
        this.dropzoneProjectRef.removeFile(dzFile);
      }
    }
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
    Objects: [''],
  })

  // Submit Project Form
  submitProjectForm():void{
    let data = this.projectForm.value
    data.Objects = [...this.uploadedProjectFiles, ...this.uploadedMainHeaderFiles]

    const formData = new FormData();
    formData.append('Title', data.Title);
    formData.append('Description', data.Description);
    formData.append('Price', data.Price);
    formData.append('Location', data.Location);
    formData.append('City', data.City);
    formData.append('RoomNumbers', data.RoomNumbers);
    formData.append('Area', data.Area);
    formData.append('Type', data.Type);
    data.Objects.forEach((img:any, index:any) => {
      formData.append(`Objects[${index}].picture`, img.picture);
      formData.append(`Objects[${index}].type`, img.type);
    });

    this._ProjectsService.createNewProject(formData).subscribe({
      next:(res)=>{
        this.getAllProjects()
        this.projectForm.reset()
        this.uploadedMainHeaderFiles = []
        this.uploadedProjectFiles = []
        this.dropzoneRef.removeAllFiles();
        this.dropzoneProjectRef.removeAllFiles();
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
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
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
      }
    })
  }

  updateProject():void{
    let data = this.projectForm.value
    data.MainPicture = this.uploadedMainHeaderFiles
    data.Objects = this.uploadedProjectFiles

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
    data.MainPicture.forEach((img:any, index:any) => {
      formData.append(`MainPicture[${index}]`, img.file);
    });
    data.Objects.forEach((img:any, index:any) => {
      formData.append(`Objects[${index}].picture`, img.file);
      formData.append(`Objects[${index}].title`, img.title);
      formData.append(`Objects[${index}].description`, img.description);
    });


    this._ProjectsService.UpdateProject(formData).subscribe({
      next:(res)=>{
        this.getAllProjects()
        this.uploadedProjectFiles = []
        this.uploadedProjectFiles = []
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

  selectedFilter: string = 'الكل';

  onFilterChange(value: string) {
    this.selectedFilter = value;
    if(value == 'الكل'){
      this.getAllProjects()
    } else if(value == 'مشاريع التمليك'){
      this.GetAllOwnershipProjects()
    } else if(value == 'عروض عقارية'){
      this.GetAllRealEstateOffers()
    }
  }

}
