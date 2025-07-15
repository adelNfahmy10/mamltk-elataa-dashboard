import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private readonly _HttpClient = inject(HttpClient)

  getAllProjects():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Projects/GetAllProjects`)
  }

  GetAllOwnershipProjects():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Projects/GetAllOwnershipProjects`)
  }

  GetAllRealEstateOffers():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Projects/GetAllRealEstateOffers`)
  }

  getAllHeaders():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Projects/GetAllHeaders`)
  }

  getPorjectById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Projects/GetProjectById/${id}`)
  }

  createNewProject(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/Projects/CreateNewProject`, data)
  }

  deleteProject(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/Projects/DeleteProject/${id}`)
  }

  deleteProjectDetails(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/Projects/DeleteProjectDetails/${id}`)
  }

  UpdateProject(data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/Projects/UpdateProject`, data)
  }
}
