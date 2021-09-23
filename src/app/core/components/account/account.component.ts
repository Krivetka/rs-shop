import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  login = localStorage.getItem('login') || '';
  private user$: Subscription | undefined;
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {}
  getAuthStatus() {
    if (localStorage.getItem('token') && localStorage.getItem('login')) {
      this.login = localStorage.getItem('login') || '';
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    this.headerService.setIsAccount(false);
  }
  ngOnDestroy(): void {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }
}
