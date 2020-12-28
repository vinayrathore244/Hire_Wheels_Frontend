import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleDetail } from 'src/app/shared/models/vehicledetail';
import { Booking } from '../models/booking';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'http://localhost:8012/';
  }

  getAllAvailableVehicles(categoryName: string, pickUpDate: string, dropDate: string, locationId: number) {
    return this.http.get<VehicleDetail[]>(
      this.baseURL + `vehicles?categoryName=${categoryName}&pickUpDate=${pickUpDate}&dropDate=${dropDate}&locationId=${locationId}`)
      .pipe(map(response => {
        return response;
      }));
  }

  bookVehicle(booking: Booking) {
    return this.http.post(this.baseURL + 'bookings/', booking)
      .pipe(map(response => {
        return response;
      }));
  }

  updatedWallet(money: number) {
    const userDate = JSON.parse(localStorage.getItem('authResponse'));
    userDate.walletMoney = money;
    localStorage.setItem('authResponse', JSON.stringify(userDate));
  }
}
