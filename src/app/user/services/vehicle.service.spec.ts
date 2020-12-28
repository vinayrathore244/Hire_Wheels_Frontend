import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleService } from './vehicle.service';

describe('VehicleService', () => {
  let service: VehicleService;
  let injector;
  let httpMock: HttpTestingController;
  let httpTestingController: HttpTestingController;

  const vehicleData = [
    {
      vehicleId: 1,
      vehicleModel: 'BMW',
      vehicleOwnerId: 1,
      vehicleOwnerName: 'Upgrad',
      vehicleNumber: '150011',
      color: 'Blue',
      fuelType: 'Petrol',
      locationId: 1,
      carImageUrl: 'https://imgd.aeplcdn.com/600x337/cw/ec/33136/BMW-M5-Exterior-172905.jpg?wm=0s=85',
      costPerHour: 300,
      activityId: 201,
      requestStatusId: 302,
      vehicleSubCategoryId: 2
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [VehicleService]
    });
    service = TestBed.inject(VehicleService);
    httpTestingController = TestBed.inject(HttpTestingController);
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get vehicle data for user', () => {

    const baseURL = 'http://localhost:8012/';
    const userId = 1;

    service.fetchVehicleByUser(userId).subscribe((vehicles: any[]) => {
      expect(vehicles.length).toBe(1);
      expect(vehicles).toBe(vehicleData);
    });

    const req = httpMock.expectOne(baseURL + `users/${userId}/vehicles`);
    expect(req.request.method).toBe('GET');
    req.flush(vehicleData);
  });
});
