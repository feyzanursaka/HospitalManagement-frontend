import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../models/patient';

@Pipe({
  name: 'patientFilterPipe'
})
export class PatientFilterPipePipe implements PipeTransform {

  transform(value: Patient[], filterText: string): Patient[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:Patient)=>p.firstName.toLocaleLowerCase().indexOf(filterText)!==-1 
    || p.lastName.toLocaleLowerCase().indexOf(filterText)!==-1 
    || p.insurance.toLocaleLowerCase().indexOf(filterText)!==-1
    || p.adress.toLocaleLowerCase().indexOf(filterText)!==-1
    || p.phoneNumber.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
