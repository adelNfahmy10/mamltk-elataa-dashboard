import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsImageService {
  private readonly _HttpClient = inject(HttpClient)

  GetAllProjectDetailsInProject(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/ProjectDetails/GetAllProjectDetailsInProject/${id}`)
  }

  GetProjectDetailsById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/ProjectDetails/GetProjectDetailsById/${id}`)
  }

  CreateProjectDetailsInProject(id:any, data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/ProjectDetails/CreateProjectDetailsInProject/${id}`, data)
  }

  UpdateProjectDetails(id:any, data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/ProjectDetails/UpdateProjectDetails/${id}`, data)
  }

  DeleteProjectDetails(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/ProjectDetails/DeleteProjectDetails/${id}`)
  }
}
