import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { VehicleDetail } from 'src/app/shared/models/vehicledetail';
import { VehicleProperty, CarSubCategory, AvailableLocation, BikeSubCategory } from 'src/app/shared/models/vehicleproperty';
import { BookingService } from '../services/booking.service';
import { AvailableVehicle } from '../models/availableVehicle';

@Component({
  selector: 'app-book-vehicle',
  templateUrl: './book-vehicle.component.html',
  styleUrls: ['./book-vehicle.component.scss'],
  providers: [DatePipe]
})
export class BookVehicleComponent implements OnInit {

  dateConfig: Partial<BsDatepickerConfig>;
  availableVehicle: AvailableVehicle = new AvailableVehicle();
  private stepper: Stepper;
  bookedVehicle: VehicleDetail;
  availableVehiclesForBooking: VehicleDetail[];
  availableVehiclesForBookingFiltered: VehicleDetail[];
  vehicleSubCategory: VehicleProperty[];
  availableLocation: VehicleProperty[];

  errorStatusMessage = '';
  vehicleType = 'CAR';

  constructor(
    private bookingService: BookingService,
    private datePipe: DatePipe,
    private authService: AuthService) {
    this.dateConfig = Object.assign({},
      {
        isAnimated: true,
        dateInputFormat: 'YYYY-MM-DD'
      });

    this.vehicleSubCategory = CarSubCategory.slice();
    this.availableLocation = AvailableLocation.slice();
  }

  ngOnInit(): void {
    this.initializeStepper();
  }

  initializeStepper(): void {
    this.stepper = new Stepper(document.querySelector('#bookingStepper'), {
      linear: true,
      animation: true
    });
  }

  next(): void {
    this.stepper.next();
  }

  prev(): void {
    this.stepper.previous();
  }

  setLocation(event) {
    const selectedLocation = event.target.value;
    if (selectedLocation === '') {
      this.availableVehicle.location = '';
    } else {
      this.availableVehicle.location = this.availableLocation.find(f => f.name === event.target.value).value;
    }
  }

  selectVehicleType(): void {
    if (this.vehicleType === 'CAR') {
      this.vehicleSubCategory = CarSubCategory.slice();
    } else if (this.vehicleType === 'BIKE') {
      this.vehicleSubCategory = BikeSubCategory.slice();
    }
    this.getAvailableVehicles(this.vehicleType);
  }

  filterVehicleList(event): void {
    const selectedvalue = event.target.value;
    if (selectedvalue !== '') {
      this.availableVehiclesForBookingFiltered =
        this.availableVehiclesForBooking.filter(f => f.vehicleSubCategoryId === Number(selectedvalue)).slice();
    } else {
      this.availableVehiclesForBookingFiltered = this.availableVehiclesForBooking.slice();
    }
  }

  fetchAvailableVehicles(vehicleType: string) {
    if (!this.availableVehicle.location) {
      this.errorStatusMessage = 'Please select a location';
      return;
    } else if (!this.availableVehicle.pickUpDate) {
      this.errorStatusMessage = 'Please select a pick up date';
      return;
    } else if (!this.availableVehicle.dropOffDate) {
      this.errorStatusMessage = 'Please select a drop off date';
      return;
    } else {
      this.vehicleType = 'CAR';
      this.getAvailableVehicles(vehicleType);
    }
  }

  getAvailableVehicles(vehicleType: string): void {

    this.errorStatusMessage = '';

    const pickUpDate = this.datePipe.transform(this.availableVehicle.pickUpDate, 'yyyy-MM-dd');
    const dropOffDate = this.datePipe.transform(this.availableVehicle.dropOffDate, 'yyyy-MM-dd');

    this.bookingService.getAllAvailableVehicles(
      vehicleType,
      pickUpDate,
      dropOffDate,
      Number(this.availableVehicle.location)).pipe()
      .subscribe((data: any) => {
        this.availableVehiclesForBooking = data;
        this.availableVehiclesForBookingFiltered = data;
        this.stepper.to(3);
      }, (response: any) => {
        this.errorStatusMessage = response.error.message;
      });
  }

  bookVehicle(vehicelID: number): void {
    this.authService.hasUserloggedIn.subscribe(data => {
      if (!data) {
        this.authService.askToSignIn.next(true);
      } else {
        this.authService.askToSignIn.next(false);
        this.bookedVehicle = this.availableVehiclesForBooking.find(f => f.vehicleId === vehicelID);
        this.stepper.next();
      }
    });
  }
}
