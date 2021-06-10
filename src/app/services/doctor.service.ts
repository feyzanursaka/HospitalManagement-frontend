import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  apiUrl="https://localhost:44390/api/doctors" ;

  constructor(private httpClient: HttpClient) { }

  getDoctors(): Observable<ListResponseModel<Doctor>> {
    return this.httpClient.get<ListResponseModel<Doctor>>(this.apiUrl+"/getall");
  }
  add(doctor:Doctor):Observable<ListResponseModel<Doctor>>{
    return this.httpClient.post<ListResponseModel<Doctor>>(this.apiUrl+"/add",doctor);
  }
  update(doctor:Doctor):Observable<ListResponseModel<Doctor>>{
    return this.httpClient.post<ListResponseModel<Doctor>>(this.apiUrl+"/update",doctor);
  }
  delete(doctor:Doctor):Observable<ListResponseModel<Doctor>>{
    return this.httpClient.post<ListResponseModel<Doctor>>(this.apiUrl+"/delete",doctor);
  }
}
