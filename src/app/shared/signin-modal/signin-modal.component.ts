import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss']
})
export class SigninModalComponent implements OnInit {

  @ViewChild('loginModal') loginModal: ModalDirective;
  isModalShown = false;

  config = {
    animated: true,
    class: 'modal-lg',
    show: true
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.hasUserloggedIn.asObservable().subscribe(data => {
      if (data) {
        if (this.isModalShown) {
          this.hideModal();
        }
      }
    });

    this.authService.askToSignIn.subscribe(data => {
      if (data) {
        this.showModal();
      }
    });
  }

  showModal(): void {
    this.isModalShown = true;
  }

  hideModal(): void {
    this.loginModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }

  navigateToRegister(staticTabs: TabsetComponent, id: number) {
    staticTabs.tabs[id].active = true;
  }

}
