import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorStatusMessage = '';
  successStatusMessage = '';

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]{9}$')])],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
      }
    );
  }

  get signUpFormControl() {
    return this.signUpForm.controls;
  }

  submitSignUpForm() {
    this.successStatusMessage = '';
    this.errorStatusMessage = '';

    if (this.signUpForm.valid) {

      const userDetails = new User();

      userDetails.firstName = this.signUpForm.value.firstName;
      userDetails.lastName = this.signUpForm.value.lastName;
      userDetails.email = this.signUpForm.value.email;
      userDetails.password = this.signUpForm.value.password;
      userDetails.mobileNo = this.signUpForm.value.mobile;

      this.authService.registerUser(userDetails).pipe()
        .subscribe((data: any) => {
          this.successStatusMessage = data.message;
        }, (response: any) => {
          this.errorStatusMessage = response.error.message;
        });
    }
  }

}
