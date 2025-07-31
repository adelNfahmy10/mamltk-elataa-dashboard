import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, TemplateRef } from '@angular/core';
import { PageTitleComponent } from '@component/page-title.component';
import { NgbDropdownModule, NgbModal, NgbModalOptions, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectFormInputDirective } from '@core/directive/select-form-input.directive';
import { ProjectsService } from '@core/services/projects/projects.service';
import { IProject } from './dat';
import Swal from 'sweetalert2';
import { DropzoneModule,DROPZONE_CONFIG,DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import { NewLinePipe } from '@core/pips/newLine/new-line.pipe';
import Editor from 'quill/core/editor';
import { QuillEditorComponent } from "ngx-quill";
import { ProjectDetailsImageService } from '@core/services/ProjectDetails-image/project-details-image.service';
import { ModelsService } from '@core/services/models/models.service';

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
  private readonly _ProjectDetailsImageService = inject(ProjectDetailsImageService)
  private readonly _ModelsService = inject(ModelsService)
  private modalService = inject(NgbModal)

  allProjects:IProject[] = []
  selectedProjectById: IProject | null = null;
  projectId:any;
  update:boolean = false

  ngOnInit(): void {
    this.getAllProjects()
    this.addModel()
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


  pdfFile: any;
  pdfUrl: string | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.pdfFile = file

    if (file && file.type === 'application/pdf') {
      this.pdfUrl = URL.createObjectURL(file);
    } else {
      this.pdfUrl = null;
      Swal.fire({
        icon:'error',
        title:'من فضلك اختر ملف PDF'
      })
    }
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
                  </div>`
  customDropzoneConfig: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFilesize: 10,
    acceptedFiles: 'image/*',
    dictDefaultMessage: ''
  };

  // Upload Header Files
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
  removeFile(index: number, fileId:any) {
    if(fileId){
      this._ProjectDetailsImageService.DeleteProjectDetails(fileId).subscribe({
        next:(res)=>{
          if(res.apiStatusCode == 200){
            Swal.fire({
              title: 'Good job!',
              text: 'Main Image Is Deleted Successfully!',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary w-xs me-2 mt-2',
              },
            })
            const removedFile = this.uploadedMainHeaderFiles[index].picture;
            this.uploadedMainHeaderFiles.splice(index, 1);
            if (this.dropzoneRef) {
              const dzFile = this.dropzoneRef.files.find((f: any) => f.name === removedFile.name);
              if (dzFile) {
                this.dropzoneRef.removeFile(dzFile);
              }
            }
          } else if(res.apiStatusCode == 400){
            Swal.fire({
              title: 'Sorry !',
              text: 'Can not Delete The Last Header Image In The Project!',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary w-xs me-2 mt-2',
              },
            })
          }
        }
      })
    } else {
      const removedFile = this.uploadedMainHeaderFiles[index].picture;
      this.uploadedMainHeaderFiles.splice(index, 1);
      if (this.dropzoneRef) {
        const dzFile = this.dropzoneRef.files.find((f: any) => f.name === removedFile.name);
        if (dzFile) {
          this.dropzoneRef.removeFile(dzFile);
        }
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
  removeProjectFile(index: number, fileId:any) {
    if(fileId){
      this._ProjectDetailsImageService.DeleteProjectDetails(fileId).subscribe({
        next:(res)=>{
          Swal.fire({
            title: 'Good job!',
            text: 'Project Image Is Deleted Successfully!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary w-xs me-2 mt-2',
            },
          })
          const removedFile = this.uploadedProjectFiles[index].picture;
          this.uploadedProjectFiles.splice(index, 1);
          if (this.dropzoneProjectRef) {
            const dzFile = this.dropzoneProjectRef.files.find((f: any) => f.name === removedFile.name);
            if (dzFile) {
              this.dropzoneProjectRef.removeFile(dzFile);
            }
          }
        }
      })
    } else {
      const removedFile = this.uploadedProjectFiles[index].picture;
      this.uploadedProjectFiles.splice(index, 1);
      if (this.dropzoneProjectRef) {
        const dzFile = this.dropzoneProjectRef.files.find((f: any) => f.name === removedFile.name);
        if (dzFile) {
          this.dropzoneProjectRef.removeFile(dzFile);
        }
      }
    }
  }

  // Models Images
  uploadedModelsFiles: any[] = []
  dropzoneModelsRef: any[] = [];
  showParkingInput: boolean[] = [];

  // Upload Image Model
  onUploadModelsSuccess(event: any, modelIndex: number): void {
    if (!this.uploadedModelsFiles[modelIndex]) {
      this.uploadedModelsFiles[modelIndex] = [];
    }
    this.uploadedModelsFiles[modelIndex].push(event[0]);
    const modelsArray = this.projectForm.get('Models') as FormArray;
    const modelGroup = modelsArray.at(modelIndex);
    modelGroup.get('images')?.setValue([...this.uploadedModelsFiles[modelIndex]]);
  }
  // File Remove
  onDropzoneModelsInit(dropzone: any, modelIndex: number): void {
    this.dropzoneModelsRef[modelIndex] = dropzone;
  }
  removeModelsFile(modelIndex: number, fileIndex: number, fileId:any): void {
    if(fileId){
      this._ProjectDetailsImageService.DeleteProjectDetails(fileId).subscribe({
        next:(res)=>{
          Swal.fire({
            title: 'Good job!',
            text: 'Model Image Is Deleted Successfully!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary w-xs me-2 mt-2',
            },
          })
          const fileToRemove = this.uploadedModelsFiles[modelIndex][fileIndex];

          // Remove from uploaded files
          this.uploadedModelsFiles[modelIndex].splice(fileIndex, 1);

          // Update form control value
          const modelsArray = this.projectForm.get('Models') as FormArray;
          const modelGroup = modelsArray.at(modelIndex);
          modelGroup.get('images')?.setValue([...this.uploadedModelsFiles[modelIndex]]);

          // Remove from dropzone UI if available
          const dropzone = this.dropzoneModelsRef[modelIndex];
          if (dropzone) {
            const dzFile = dropzone.files.find((f: any) => f.name === fileToRemove.name);
            if (dzFile) {
              dropzone.removeFile(dzFile);
            }
          }
        }
      })
    } else {
      const fileToRemove = this.uploadedModelsFiles[modelIndex][fileIndex];

      // Remove from uploaded files
      this.uploadedModelsFiles[modelIndex].splice(fileIndex, 1);

      // Update form control value
      const modelsArray = this.projectForm.get('Models') as FormArray;
      const modelGroup = modelsArray.at(modelIndex);
      modelGroup.get('images')?.setValue([...this.uploadedModelsFiles[modelIndex]]);

      // Remove from dropzone UI if available
      const dropzone = this.dropzoneModelsRef[modelIndex];
      if (dropzone) {
        const dzFile = dropzone.files.find((f: any) => f.name === fileToRemove.name);
        if (dzFile) {
          dropzone.removeFile(dzFile);
        }
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
    ProjectFile: [''],
    Objects: [''],
    Models: this._FormBuilder.array([]),
  })

  // Create Model Object
  createModelGroup(): FormGroup {
    return this._FormBuilder.group({
      id:[''],
      space: [''],
      price: [''],
      pathRoomNumber: [''],
      floor: [''],
      roomNumbers: [''],
      title: [''],
      images: [[]],
      parking: [''],
    });
  }

  // Get Model
  get modelsArray(): FormArray {
    return this.projectForm.get('Models') as FormArray;
  }

  // Add Model
  addModel(): void {
    this.modelsArray.push(this.createModelGroup());
    this.uploadedModelsFiles.push([]);
    this.dropzoneModelsRef.push(null);
    this.showParkingInput.push(false);
  }

  // Remove Model
  removeModel(index: number, modelId:any): void {
    if(modelId){
      this._ModelsService.DeleteModel(modelId).subscribe({
        next:(res)=>{
          this.modelsArray.removeAt(index);
          this.uploadedModelsFiles.splice(index, 1);
          this.dropzoneModelsRef.splice(index, 1);
          this.showParkingInput.splice(index, 1);
          Swal.fire({
            title: 'Good job!',
            text: 'Remove Models Is Successfully!',
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary w-xs me-2 mt-2',
            },
          })
        }
      })
    } else{
      this.modelsArray.removeAt(index);
      this.uploadedModelsFiles.splice(index, 1);
      this.dropzoneModelsRef.splice(index, 1);
      this.showParkingInput.splice(index, 1);
    }
  }

  // Toggle Parking
  toggleParkingInput(index: number): void {
    this.showParkingInput[index] = !this.showParkingInput[index];
  }

  // Submit Project Form
  submitProjectForm():void{
    let data = this.projectForm.value
    data.ProjectFile = this.pdfFile
    data.Objects = [...this.uploadedProjectFiles, ...this.uploadedMainHeaderFiles]
    data.Models.images = [...this.uploadedModelsFiles]
    if(!this.showParkingInput){
      data.Models.parking = null
    }

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
    formData.append('ProjectFile', data.ProjectFile);

    data.Objects.forEach((img:any, index:any) => {
      formData.append(`Objects[${index}].picture`, img.picture);
      formData.append(`Objects[${index}].type`, img.type);
    });

    data.Models.forEach((model: any, index: number) => {
      formData.append(`Models[${index}].space`, model.space);
      formData.append(`Models[${index}].price`, model.price);
      formData.append(`Models[${index}].pathRoomNumber`, model.pathRoomNumber);
      formData.append(`Models[${index}].floor`, model.floor);
      formData.append(`Models[${index}].roomNumbers`, model.roomNumbers);
      formData.append(`Models[${index}].title`, model.title);
      formData.append(`Models[${index}].parking`, model.parking);

      model.images.forEach((img: any) => {
        formData.append(`Models[${index}].images`, img);
      });
    });

    this._ProjectsService.createNewProject(formData).subscribe({
      next:(res)=>{
        this.getAllProjects()
        this.projectForm.reset()
        this.uploadedMainHeaderFiles = []
        this.uploadedProjectFiles = []
        this.dropzoneRef.removeAllFiles();
        this.dropzoneProjectRef.removeAllFiles();
        this.pdfFile = null

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
          Space: data.space,
          ProjectFile: data.projectFile
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

        const modelsArray = this.projectForm.get('Models') as FormArray;
        modelsArray.clear();
        data.models.forEach((model: any) => {
          this.modelsArray.push(this._FormBuilder.group({
            id: [model.id],
            title: [model.title],
            price: [model.price],
            roomNumbers: [model.roomNumbers],
            space: [model.space],
            parking: [model.parking],
            floor: [model.floor],
            pathRoomNumber: [model.pathRoomNumber],
            city: [model.city],
            area: [model.area],
            location: [model.location],
            images: [model.images]
          }));
        });

        this.uploadedModelsFiles = [];
        data.models.forEach((model: any, index: number) => {
          this.uploadedModelsFiles[index] = model.images || [];
        });
      }
    });
  }

  updateProject():void{
    let data = this.projectForm.value
    data.Id = this.projectId
    data.ProjectFile = this.pdfFile
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
    formData.append('ProjectFile', data.ProjectFile);
    data.Objects.forEach((img:any, index:any) => {
      if(!img.id){
        formData.append(`Objects[${index}].id`, img.id || 0);
        formData.append(`Objects[${index}].type`, img.type);
        formData.append(`Objects[${index}].pictureFile`, img.picture);
      }
    });

    data.Models.forEach((model: any, index: number) => {
      formData.append(`Models[${index}].id`, model.id || 0);
      formData.append(`Models[${index}].space`, model.space);
      formData.append(`Models[${index}].price`, model.price);
      formData.append(`Models[${index}].pathRoomNumber`, model.pathRoomNumber);
      formData.append(`Models[${index}].floor`, model.floor);
      formData.append(`Models[${index}].roomNumbers`, model.roomNumbers);
      formData.append(`Models[${index}].title`, model.title);
      formData.append(`Models[${index}].parking`, model.parking);
      formData.append(`Models[${index}].Location`, data.Location);
      formData.append(`Models[${index}].Area`, data.Area);
      formData.append(`Models[${index}].City`, data.City);

      model.images.forEach((img: any, i:number) => {
        if(typeof img != 'string'){
          formData.append(`Models[${index}].newImages[${i}].id`, img.id || 0);
          formData.append(`Models[${index}].newImages[${i}].file`, img);
        }
      });
    });


    this._ProjectsService.UpdateProject(formData).subscribe({
      next:(res)=>{
        this.getAllProjects()
        this.projectForm.reset()
        this.uploadedMainHeaderFiles = []
        this.uploadedProjectFiles = []
        this.dropzoneRef.removeAllFiles();
        this.dropzoneProjectRef.removeAllFiles();
        this.modelsArray.clear();
        this.pdfFile = null
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

  selectedFilter: string = 'مشاريع التمليك';

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
