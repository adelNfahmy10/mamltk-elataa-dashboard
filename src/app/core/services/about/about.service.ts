import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private readonly _HttpClient = inject(HttpClient)

  GetAllAboutUs():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/AboutUs/GetAllAboutUs`)
  }

  GetAboutUsById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/AboutUs/GetAboutUsById/${id}`)
  }

  CreateAboutUs(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/AboutUs/CreateAboutUs`, data)
  }

  UpdateAboutUs(data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/AboutUs/UpdateAboutUs`, data)
  }

  DeleteAboutUs(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/AboutUs/DeleteAboutUs/${id}`)
  }
}
