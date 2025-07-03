import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private readonly _HttpClient = inject(HttpClient)

  GetAllConfigurations():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Configuration/GetAllConfigurations`)
  }

  GetConfigurationById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/Configuration/GetConfigurationById/${id}`)
  }

  CreateConfiguration(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/Configuration/CreateConfiguration`, data)
  }

  UpdateConfiguration(data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/Configuration/UpdateConfiguration`, data)
  }

  DeleteConfiguration(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/Configuration/DeleteConfiguration/${id}`)
  }
}
