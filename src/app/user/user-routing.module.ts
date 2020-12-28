import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    { path: 'admin/dashboard', pathMatch: 'full', component: AdminDashboardComponent, canActivate: [AdminGuard] },
    { path: 'admin/add-vehicle', pathMatch: 'full', component: AddVehicleComponent, canActivate: [AdminGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
