import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractingService {
  private readonly _HttpClient = inject(HttpClient)

  GetAllContracting():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Contracting/GetAllContracting`)
  }

  GetContractingById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Contracting/GetContractingById/${id}`)
  }

  CreateContracting(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/Contracting/CreateContracting`, data)
  }

  UpdateContracting(data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/Contracting/UpdateContracting`, data)
  }

  DeleteContracting(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/Contracting/DeleteContracting/${id}`)
  }
}
