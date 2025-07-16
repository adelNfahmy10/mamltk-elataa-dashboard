import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@core/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreviousInvestmentsService {
  private readonly _HttpClient = inject(HttpClient)

  GetAllPreviousInvestments():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/PreviousInvestments/GetAll`)
  }

  GetPreviousInvestmentsById(id:any):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}api/PreviousInvestments/GetById/${id}`)
  }

  CreatePreviousInvestments(data:any):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}api/PreviousInvestments/Create`, data)
  }

  UpdatePreviousInvestments(data:any):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}api/PreviousInvestments/Update`, data)
  }

  DeletePreviousInvestments(id:any):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}api/PreviousInvestments/Delete/${id}`)
  }
}
