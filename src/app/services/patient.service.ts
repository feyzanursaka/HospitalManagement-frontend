import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl="https://localhost:44390/api/patients" ;

  constructor(private httpClient: HttpClient) { }

  getPatients(): Observable<ListResponseModel<Patient>> {
    return this.httpClient.get<ListResponseModel<Patient>>(this.apiUrl+"/getall");
  }
  add(patient:Patient):Observable<ListResponseModel<Patient>>{
    return this.httpClient.post<ListResponseModel<Patient>>(this.apiUrl+"/add",patient);
  }
  update(patient:Patient):Observable<ListResponseModel<Patient>>{
    return this.httpClient.post<ListResponseModel<Patient>>(this.apiUrl+"/update",patient);
  }
  delete(patient:Patient):Observable<ListResponseModel<Patient>>{
    return this.httpClient.post<ListResponseModel<Patient>>(this.apiUrl+"/delete",patient);
  }
}
