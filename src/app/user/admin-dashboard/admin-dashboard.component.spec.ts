import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { VehicleService } from '../services/vehicle.service';

let authService: AuthService;
let vehicleService: VehicleService;
let adminDashboardComponent: AdminDashboardComponent;

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    authService = jasmine.createSpyObj('authService', ['userData']);
    vehicleService = jasmine.createSpyObj('vehicleService', ['fetchVehicleByUser']);

    adminDashboardComponent = new AdminDashboardComponent(authService, vehicleService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch Vehicle data for a User', () => {
    adminDashboardComponent.getAllVehiclesByUser();
    expect(vehicleService.fetchVehicleByUser).toHaveBeenCalled();
  });
});
