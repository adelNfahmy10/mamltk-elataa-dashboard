import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly _HttpClient = inject(HttpClient)

  GetAllContactUs():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/ContactUs/GetAllContactUs`)
  }

  GetContactUsById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/ContactUs/GetContactUsById/${id}`)
  }

  CreateContactUs(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/ContactUs/CreateContactUs`, data)
  }

  UpdateContactUs(id:number, data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/ContactUs/UpdateContactUs/${id}`, data)
  }

  DeleteContactUs(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/ContactUs/DeleteContactUs/${id}`)
  }
}
