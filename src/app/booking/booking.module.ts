import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookVehicleComponent } from './book-vehicle/book-vehicle.component';
import { BookingRoutingModule } from './booking-routing.module';
import { AvailableVehicleComponent } from './available-vehicle/available-vehicle.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BookVehicleComponent, AvailableVehicleComponent, ConfirmBookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    FormsModule,
    SharedModule
  ]
})
export class BookingModule { }
