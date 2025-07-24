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
import Editor from 'quill/core/editor';
import { QuillEditorComponent } from "ngx-quill";

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
    NewLinePipe,
    QuillEditorComponent
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
    Space: [''],
    Objects: ['']
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
    formData.append('Space', data.Space);
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

  patchProjectData(project: any): void {
    this.projectId = project.id;

    this._ProjectsService.getPorjectById(this.projectId).subscribe({
      next: (res) => {
        const data = res.data;
        this.update = true;

        // Patch القيم داخل الفورم
        this.projectForm.patchValue({
          Title: data.title,
          Description: data.description,
          Price: data.price,
          Location: data.location,
          City: data.city,
          RoomNumbers: data.roomNumbers,
          Area: data.area,
          Type: data.type,
          Space: data.space
        });

        this.uploadedMainHeaderFiles = data.projectDetails
        .filter((item: any) => item.type === 1)
        .map((item: any) => ({
          id: item.id,
          type: 1,
          picture: item.picture
        }));

        this.uploadedProjectFiles = data.projectDetails
          .filter((item: any) => item.type === 2)
          .map((item: any) => ({
            id: item.id,
            type: 2,
            picture: item.picture
          }));
      }
    });
  }


  updateProject():void{
    let data = this.projectForm.value
    data.Id = this.projectId
    data.Objects = [...this.uploadedProjectFiles, ...this.uploadedMainHeaderFiles]

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
    formData.append('Space', data.Space);
    data.Objects.forEach((img:any, index:any) => {
      formData.append(`Objects[${index}].id`, img.id || 0);
      formData.append(`Objects[${index}].type`, img.type);
      formData.append(`Objects[${index}].picture`, img.picture);
    });


    this._ProjectsService.UpdateProject(formData).subscribe({
      next:(res)=>{
        this.getAllProjects()
        this.projectForm.reset()
        this.uploadedMainHeaderFiles = []
        this.uploadedProjectFiles = []
        this.dropzoneRef.removeAllFiles();
        this.dropzoneProjectRef.removeAllFiles();
        Swal.fire({
          title: 'Good job!',
          text: 'Update Project Is Successed!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary w-xs me-2 mt-2',
          },
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

  editor!: Editor

  content: string = `أدخل التفاصيل الخاصة بالمشروع`

  public model = {
    editorData: this.content,
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
