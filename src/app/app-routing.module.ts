import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';



const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"doctors",component:DoctorComponent},
  {path:"patients",component:PatientComponent},
  {path:"appointments",component:AppointmentComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }