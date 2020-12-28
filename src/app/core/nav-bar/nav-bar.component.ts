import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  userData = new User();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.userData.subscribe(data => {
      this.userData = data;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
