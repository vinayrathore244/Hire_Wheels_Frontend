import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  errorStatusMessage = '';
  successStatusMessage = '';

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeResetPasswordForm();
  }

  initializeResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]{9}$')])],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get resetPasswordFormControl() {
    return this.resetPasswordForm.controls;
  }

  onResetPasswordFormSubmit() {
    this.successStatusMessage = '';
    this.errorStatusMessage = '';

    if (this.resetPasswordForm.valid) {

      const userDetails = new User();
      userDetails.email = this.resetPasswordForm.value.email;
      userDetails.password = this.resetPasswordForm.value.password;
      userDetails.mobileNo = this.resetPasswordForm.value.mobile;

      this.authService.resetPassword(userDetails).pipe()
        .subscribe((data: any) => {
          this.successStatusMessage = data.message;
        }, (response: any) => {
          this.errorStatusMessage = response.error.message;
        });
    }
  }


}
