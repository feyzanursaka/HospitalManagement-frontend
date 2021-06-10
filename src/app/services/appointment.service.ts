import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  apiUrl="https://localhost:44390/api/appointments" ;

  constructor(private httpClient: HttpClient) { }
  
  getAppointments(): Observable<ListResponseModel<Appointment>> {
    return this.httpClient.get<ListResponseModel<Appointment>>(this.apiUrl+"/getall");
  }
  getAppointmentDetails(): Observable<ListResponseModel<Appointment>> {
    return this.httpClient.get<ListResponseModel<Appointment>>(this.apiUrl+"/getappointmentdetail");
  }
  add(appointment:Appointment):Observable<ListResponseModel<Appointment>>{
    return this.httpClient.post<ListResponseModel<Appointment>>(this.apiUrl+"/add",appointment);
  }
  update(appointment:Appointment):Observable<ListResponseModel<Appointment>>{
    return this.httpClient.post<ListResponseModel<Appointment>>(this.apiUrl+"/update",appointment);
  }
  delete(appointment:Appointment):Observable<ListResponseModel<Appointment>>{
    return this.httpClient.post<ListResponseModel<Appointment>>(this.apiUrl+"/delete",appointment);
  }
}
