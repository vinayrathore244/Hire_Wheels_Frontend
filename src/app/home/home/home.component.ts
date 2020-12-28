import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isBookNowDisabled = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.setBookButtonStatus();
  }

  setBookButtonStatus() {
    this.authService.userData.asObservable().subscribe(data => {
      if (data.roleName === 'Admin') {
        this.isBookNowDisabled = true;
      } else {
        this.isBookNowDisabled = false;
      }
    });
  }
}
