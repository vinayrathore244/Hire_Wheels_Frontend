import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [NavBarComponent, FooterComponent]
})
export class CoreModule { }
