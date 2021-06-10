import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './components/home/home.component';
import { NaviComponent } from './components/navi/navi.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PatientFilterPipePipe } from './pipes/patient-filter-pipe.pipe';
import { DoctorFilterPipePipe } from './pipes/doctor-filter-pipe.pipe';
import { AppointmentFilterPipePipe } from './pipes/appointment-filter-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    HomeComponent,
    DoctorComponent,
    PatientComponent,
    NaviComponent,
    AppointmentComponent,
    HomeComponent,
    PatientFilterPipePipe,
    DoctorFilterPipePipe,
    AppointmentFilterPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }