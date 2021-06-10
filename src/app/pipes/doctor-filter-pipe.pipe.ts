import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../models/doctor';

@Pipe({
  name: 'doctorFilterPipe'
})
export class DoctorFilterPipePipe implements PipeTransform {

  transform(value: Doctor[], filterText: string): Doctor[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:Doctor)=>p.firstName.toLocaleLowerCase().indexOf(filterText)!==-1 
    || p.lastName.toLocaleLowerCase().indexOf(filterText)!==-1 
    || p.insurance.toLocaleLowerCase().indexOf(filterText)!==-1
    || p.adress.toLocaleLowerCase().indexOf(filterText)!==-1
    || p.phoneNumber.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
