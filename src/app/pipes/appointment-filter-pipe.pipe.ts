import { Pipe, PipeTransform } from '@angular/core';
import { Appointment } from '../models/appointment';

@Pipe({
  name: 'appointmentFilterPipe'
})
export class AppointmentFilterPipePipe implements PipeTransform {

  transform(value: Appointment[], filterText: string): Appointment[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:Appointment)=>p.doctorName.toLocaleLowerCase().indexOf(filterText)!==-1 
    || p.patientName.toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }

}
