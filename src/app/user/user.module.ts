import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [AdminDashboardComponent, AddVehicleComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AlertModule.forRoot()
  ]
})
export class UserModule { }
