import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  [x: string]: any;
  doctors: Doctor[] = [];
  filterTextDoctor="";
  currentDoctor:Doctor;

  addDoctorForm: FormGroup;
  updateDoctorForm: FormGroup;
  deleteDoctorForm: FormGroup;

  selectedDoctor: Doctor;
  
  constructor(
    private doctorService:DoctorService,
    private toastrService: ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,

    ) { }
  ngOnInit(): void {
    this.getDoctors();
    this.addCreateForm();
    this.updateCreateForm();
    this.deleteCreateForm();
  }

  getDoctors(){
    this.doctorService.getDoctors().subscribe(response=>{
      this.doctors=response.data

    });
  }

  setCurrentDoctor(doctor:Doctor){
    this.currentDoctor = doctor;
  }

  getCurrentDoctorClass(doctor:Doctor){
    if(doctor ==this.currentDoctor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setSelectedDoctorToUpdate(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.updateCreateForm();
  }

  setSelectedDoctorToDelete(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.deleteCreateForm();
  }

  addCreateForm() {
    this.addDoctorForm = this.formBuilder.group({

      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      insurance: ["", Validators.required],
      adress: ["", Validators.required],
      phoneNumber: ["", Validators.required]

    })
  }

  deleteCreateForm() {
    this.deleteDoctorForm = this.formBuilder.group({
      doctortId: [this.selectedDoctor?.doctorId, Validators.required],
      firstName: [this.selectedDoctor?.firstName, Validators.required],
      lastName: [this.selectedDoctor?.lastName, Validators.required],
      insurance: [this.selectedDoctor?.insurance, Validators.required],
      adress: [this.selectedDoctor?.adress, Validators.required],
      phoneNumber: [this.selectedDoctor?.phoneNumber, Validators.required]
    });
  }

  updateCreateForm() {
    this.updateDoctorForm = this.formBuilder.group({
      doctorId: [this.selectedDoctor?.doctorId, Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      insurance: ["", Validators.required],
      adress: ["", Validators.required],
      phoneNumber: ["", Validators.required]
    });
  }

  addDoctor() {
   
    if(this.addDoctorForm.valid){
      let doctorModel = Object.assign({},this.addDoctorForm.value)
      this.doctorService.add(doctorModel).subscribe(response=>{
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
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
    
  }
  updateDoctor() {
    if(this.updateDoctorForm.valid){
      let doctorModel = Object.assign({},this.updateDoctorForm.value)
      this.doctorService.update(doctorModel).subscribe(response=>{
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

  deleteDoctor() {
    if(this.deleteDoctorForm.valid){
      let doctorModel = Object.assign({},this.deleteDoctorForm.value)
      this.doctorService.delete(doctorModel).subscribe(response=>{
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
      console.log(this.doctorDeleteForm);
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
 
}
