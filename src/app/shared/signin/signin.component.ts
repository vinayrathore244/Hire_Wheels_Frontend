import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  errorStatusMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeSigninForm();
  }

  initializeSigninForm() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get signinFormControl() {
    return this.signinForm.controls;
  }

  submitSigninForm() {

    this.errorStatusMessage = '';

    if (this.signinForm.valid) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.authService.loginUser(this.signinForm.value).pipe()
        .subscribe(() => {
          this.authService.hasUserloggedIn.next(true);
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          }
        }, (response: any) => {
          this.errorStatusMessage = response.error.message;
        });
    }
  }
}
