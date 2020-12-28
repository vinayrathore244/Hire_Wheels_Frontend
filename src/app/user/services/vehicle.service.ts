import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle';
import { Observable } from 'rxjs';
import { VehicleDetail } from 'src/app/shared/models/vehicledetail';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'http://localhost:8012/';
  }

  addVehicles(vehicle: Vehicle) {
    return this.http.post(this.baseURL + 'vehicles/', vehicle)
      .pipe(map(response => {
        return response;
      }));
  }

  fetchVehicleByUser(userID: number): Observable<VehicleDetail[]> {
    return this.http.get<VehicleDetail[]>(this.baseURL + `users/${userID}/vehicles`)
      .pipe(map(response => {
        return response;
      }));
  }
}
