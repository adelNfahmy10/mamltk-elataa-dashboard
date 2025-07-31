import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  private readonly _HttpClient = inject(HttpClient)

  GetAllModelsInProject(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Model/GetAllModelsInProject/${id}`)
  }

  GetModelById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Model/GetModelById/${id}`)
  }

  CreateNewModelInProject(id:any, data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/Model/CreateNewModelInProject/${id}`, data)
  }

  UpdateModel(id:any, data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/Model/UpdateModel/${id}`, data)
  }

  DeleteModel(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/Model/DeleteModel/${id}`)
  }
}
