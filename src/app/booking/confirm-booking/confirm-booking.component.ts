import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { VehicleDetail } from 'src/app/shared/models/vehicledetail';
import { Booking } from '../models/booking';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent implements OnChanges {

  @Input()
  bookedVehicle: VehicleDetail = new VehicleDetail();
  @Input()
  pickUpDate: Date;
  @Input()
  dropOffDate: Date;
  @Input()
  location: number;

  @Output()
  navigateBack: EventEmitter<boolean> = new EventEmitter(false);

  userData = new User();
  errorStatusMessage: string;
  bookingDuration: number;
  bookingAmount: number;
  showSuccessAlert = false;
  booking = new Booking();

  constructor(
    private bookingService: BookingService,
    private authService: AuthService) { }

  ngOnChanges() {

    this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
    this.calculateBookingAmount();
  }

  bookVehicle() {

    this.errorStatusMessage = '';
    this.setWallet();
    this.setBookingDetails();

    this.bookingService.bookVehicle(this.booking).pipe()
      .subscribe((data: any) => {
        if (data.bookingId) {
          this.showSuccessAlert = true;
        }
      }, (response: any) => {
        this.errorStatusMessage = response.error.message;
      });
  }

  gotToPreviousStep() {
    this.navigateBack.emit(true);
  }

  calculateBookingAmount() {
    this.bookingDuration = Math.ceil((this.dropOffDate.getTime() - this.pickUpDate.getTime()) / (1000 * 3600 * 24));
    this.bookingAmount = this.bookingDuration * this.bookedVehicle.costPerHour;
  }

  setWallet() {
    this.userData.walletMoney = this.userData.walletMoney - this.bookingAmount;
    this.bookingService.updatedWallet(this.userData.walletMoney);
    this.authService.userData.next(this.userData);
  }

  setBookingDetails() {
    this.booking.userId = this.userData.userId;
    this.booking.vehicleId = this.bookedVehicle.vehicleId;
    this.booking.pickupDate = this.pickUpDate;
    this.booking.dropoffDate = this.dropOffDate;
    this.booking.bookingDate = new Date(Date.now());
    this.booking.locationId = this.location;
    this.booking.amount = this.bookingAmount;
  }
}
