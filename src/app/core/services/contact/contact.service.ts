import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
private readonly _HttpClient = inject(HttpClient)

  GetAllContacts():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Contacts/GetAllContacts`)
  }

  GetContactById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Contacts/GetContactById/${id}`)
  }

  CreateContact(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/Contacts/CreateContact`, data)
  }

  UpdateContact(data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/Contacts/UpdateContact`, data)
  }

  DeleteContact(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/Contacts/DeleteContact/${id}`)
  }
}
