import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  [x: string]: any;
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  appointments: Appointment[] = [];
  appointmentDetails: Appointment[] = [];
  
  filterTextAppointment="";
  currentAppointment:Appointment;

  addAppointmentForm: FormGroup;
  updateAppointmentForm: FormGroup;
  deleteAppointmentForm: FormGroup;

  selectedAppointment: Appointment;

  constructor(private patientService:PatientService,
    private doctorService:DoctorService,
    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private appointmentService:AppointmentService

    ) { }
 

  ngOnInit(): void {
    this.getAppointmentDetails();
    this.getAppointments();
    this.getPatients();
    this.getDoctors();
    this.addCreateForm();
    this.updateCreateForm();
    this.deleteCreateForm();
  }

  getAppointments(){
    this.appointmentService.getAppointments().subscribe(response=>{
      this.appointmentDetail=response.data

    });
  }

  getPatients(){
    this.patientService.getPatients().subscribe(response=>{
      this.patients=response.data

    });
  }

  getDoctors(){
    this.doctorService.getDoctors().subscribe(response=>{
      this.doctors=response.data

    });
  }

  getAppointmentDetails(){
    this.appointmentService.getAppointmentDetails().subscribe(response=>{
      this.appointmentDetails=response.data

    });
  }

  setCurrentAppointment(appointment:Appointment){
    this.currentAppointment = appointment;
  }

  getCurrentAppointmentClass(appointment:Appointment){
    if(appointment ==this.currentAppointment){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setSelectedAppointmentToUpdate(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.updateCreateForm();
  }

  setSelectedAppointmentToDelete(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.deleteCreateForm();
  }


  addCreateForm() {
    this.addAppointmentForm = this.formBuilder.group({

      patientId: ["", Validators.required],
      doctorId: ["", Validators.required],
      appointmentDate: ["", Validators.required]

    })
  }

  deleteCreateForm() {
    this.deleteAppointmentForm = this.formBuilder.group({
      appointmentId: [this.selectedAppointment?.appointmentId, Validators.required],
      patientId: [this.selectedAppointment?.patientId, Validators.required],
      doctorId: [this.selectedAppointment?.doctorId, Validators.required],
      appointmentDate: [this.selectedAppointment?.appointmentDate, Validators.required],
    });
  }

  updateCreateForm() {
    this.updateAppointmentForm = this.formBuilder.group({
      appointmentId: [this.selectedAppointment?.appointmentId, Validators.required],
      patientId: ["", Validators.required],
      doctorId: ["", Validators.required],
      appointmentDate: ["", Validators.required],
    });
  }

  addAppointment() {
   
    if(this.addAppointmentForm.valid){
      let appointmentModel = Object.assign({},this.addAppointmentForm.value)
      this.appointmentService.add(appointmentModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            console.log(responseError.error.Errors[i])
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }
  updateAppointment() {
    if(this.updateAppointmentForm.valid){
      let appointmentModel = Object.assign({},this.updateAppointmentForm.value)
      this.appointmentService.update(appointmentModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            console.log(responseError.error.Errors[i])
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      console.log(this.carUpdateForm);
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  deleteAppointment() {
    if(this.deleteAppointmentForm.valid){
      let appointmentModel = Object.assign({},this.deleteAppointmentForm.value)
      this.appointmentService.delete(appointmentModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            console.log(responseError.error.Errors[i])
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Doğrulama hatası")
          }       
        } 
      })
      
    }else{
      console.log(this.carDeleteForm);
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }


 
}
