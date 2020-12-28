import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SigninModalComponent } from './signin-modal/signin-modal.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SubcategoryPipe } from './pipes/subcategory.pipe';


@NgModule({
  declarations: [ResetPasswordComponent, SigninComponent, SignupComponent, SigninModalComponent, SubcategoryPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    HttpClientModule
  ],
  exports: [ResetPasswordComponent, SigninComponent, SignupComponent, SigninModalComponent, SubcategoryPipe]
})
export class SharedModule { }
