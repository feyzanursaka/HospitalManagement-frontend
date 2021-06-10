import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  [x: string]: any;
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  filterTextPatient="";
  currentPatient:Patient;

  addPatientForm: FormGroup;
  updatepatientForm: FormGroup;
  deletePatientForm: FormGroup;

  selectedPatient: Patient;
  
  constructor(private patientService:PatientService,
    private doctorService:DoctorService,
    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,

    ) { }

  ngOnInit(): void {
    this.getPatients();
    this.getDoctors();
    this.addCreateForm();
    this.updateCreateForm();
    this.deleteCreateForm();
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

  setCurrentPatient(patient:Patient){
    this.currentPatient = patient;
  }

  getCurrentPatientClass(patient:Patient){
    if(patient ==this.currentPatient){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setSelectedPatientToUpdate(patient: Patient) {
    this.selectedPatient = patient;
    this.updateCreateForm();
  }

  setSelectedPatientToDelete(patient: Patient) {
    this.selectedPatient = patient;
    this.deleteCreateForm();
  }

  addCreateForm() {
    this.addPatientForm = this.formBuilder.group({

      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      doctorId: ["", Validators.required],
      insurance: ["", Validators.required],
      adress: ["", Validators.required],
      phoneNumber: ["", Validators.required]

    })
  }

  deleteCreateForm() {
    this.deletePatientForm = this.formBuilder.group({
      patientId: [this.selectedPatient?.patientId, Validators.required],
      firstName: [this.selectedPatient?.firstName, Validators.required],
      lastName: [this.selectedPatient?.lastName, Validators.required],
      doctorId: [this.selectedPatient?.doctorId, Validators.required],
      insurance: [this.selectedPatient?.insurance, Validators.required],
      adress: [this.selectedPatient?.adress, Validators.required],
      phoneNumber: [this.selectedPatient?.phoneNumber, Validators.required]
    });
  }

  updateCreateForm() {
    this.updatePatientForm = this.formBuilder.group({
      patientId: [this.selectedPatient?.patientId, Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      doctorId: ["", Validators.required],
      insurance: ["", Validators.required],
      adress: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }

  addPatient() {
   
    if(this.addPatientForm.valid){
      let patientModel = Object.assign({},this.addPatientForm.value)
      this.patientService.add(patientModel).subscribe(response=>{
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
  updatePatient() {
    if(this.updatePatientForm.valid){
      let patientModel = Object.assign({},this.updatePatientForm.value)
      this.patientService.update(patientModel).subscribe(response=>{
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

  deletePatient() {
    if(this.deletePatientForm.valid){
      let patientModel = Object.assign({},this.deletePatientForm.value)
      this.patientService.delete(patientModel).subscribe(response=>{
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