import { Component, OnInit } from '@angular/core';
import { VehicleProperty, CarSubCategory, BikeSubCategory, AvailableLocation } from 'src/app/shared/models/vehicleproperty';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { VehicleService } from '../services/vehicle.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  addVehicleForm: FormGroup;
  userData = new User();
  errorStatusMessage = '';
  successStatusMessage = '';
  vehicleSubCategory: VehicleProperty[];
  availableLocation: VehicleProperty[];

  vehicleFuelType: VehicleProperty[] = [
    {
      name: 'Petrol',
      value: '1'
    },
    {
      name: 'Diesel',
      value: '2'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private authService: AuthService) {
    this.availableLocation = AvailableLocation;
  }

  ngOnInit(): void {
    this.initializeAddVehicleForm();

    this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }

  initializeAddVehicleForm() {
    this.addVehicleForm = this.fb.group({
      vehicleModel: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      category: ['', Validators.required],
      fuelType: ['', Validators.required],
      subCategory: ['', Validators.required],
      color: ['', Validators.required],
      location: ['', Validators.required],
      imageURL: ['', Validators.required]
    });
  }

  get addVehicleFormControl() {
    return this.addVehicleForm.controls;
  }

  getSubcategory(event) {
    if (event.target.value === 'Car') {
      this.vehicleSubCategory = CarSubCategory.slice();
    } else if (event.target.value === 'Bike') {
      this.vehicleSubCategory = BikeSubCategory.slice();
    }
  }

  onAddVehicleFormSubmit() {

    this.successStatusMessage = '';
    this.errorStatusMessage = '';

    if (this.addVehicleForm.valid) {
      const vehicleDetails = this.setVehicleDetails();
      this.vehicleService.addVehicles(vehicleDetails).pipe()
        .subscribe((data: any) => {
          this.successStatusMessage = data.message;
        }, (response: any) => {
          this.errorStatusMessage = response.error.message;
        });
    }
  }

  setVehicleDetails(): Vehicle {
    const vehicle = new Vehicle();

    vehicle.vehicleModel = this.addVehicleForm.value.vehicleModel;
    vehicle.vehicleNumber = this.addVehicleForm.value.vehicleNumber;
    vehicle.vehicleSubCategoryId = this.addVehicleForm.value.subCategory.value;
    vehicle.color = this.addVehicleForm.value.color;
    vehicle.fuelTypeId = this.addVehicleForm.value.fuelType.value;
    vehicle.locationId = this.addVehicleForm.value.location.value;
    vehicle.carImageUrl = this.addVehicleForm.value.imageURL;
    vehicle.userId = this.userData.userId;

    return vehicle;
  }
}
