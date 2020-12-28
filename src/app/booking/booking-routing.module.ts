import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookVehicleComponent } from './book-vehicle/book-vehicle.component';
import { BookingGuard } from './guards/booking.guard';

const routes: Routes = [
    { path: 'book-vehicle', pathMatch: 'full', component: BookVehicleComponent, canActivate: [BookingGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class BookingRoutingModule { }
