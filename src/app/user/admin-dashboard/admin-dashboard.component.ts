import { Component, OnInit } from '@angular/core';
import { VehicleDetail } from 'src/app/shared/models/vehicledetail';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { VehicleService } from '../services/vehicle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  vehicleDetail$: Observable<VehicleDetail[]>;
  userData = new User();

  constructor(
    private authService: AuthService,
    private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.authService.userData.subscribe(data => {
      this.userData = data;
    });
    this.getAllVehiclesByUser();
  }

  getAllVehiclesByUser() {
    this.vehicleDetail$ = this.vehicleService.fetchVehicleByUser(this.userData.userId);
  }

}
