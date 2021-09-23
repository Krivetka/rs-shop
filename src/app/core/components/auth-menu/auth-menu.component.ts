import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss'],
})
export class AuthMenuComponent implements OnInit, OnDestroy {
  loginControl = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  registrationControl = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  private registration$: Subscription | undefined;
  private login$: Subscription | undefined;
  private user$: Subscription | undefined;

  constructor(public headerService: HeaderService, private router: Router) {}

  ngOnInit(): void {}
  submitRegistration() {
    if (this.registrationControl.valid) {
      this.registration$ = this.headerService
        .postToken(this.registrationControl.value)
        .subscribe((res) => {
          this.setInfo(this.registrationControl.value.login, res.token);
          this.router.navigate(['/']);
        });
    }
  }
  submitLogin() {
    if (this.loginControl.valid) {
      this.login$ = this.headerService
        .postAuth(this.loginControl.value)
        .subscribe((res) => {
          this.setInfo(this.loginControl.value.login, res.token);
          this.router.navigate(['/']);
        });
    }
  }
  setInfo(login: string, token: string) {
    localStorage.setItem('login', login);
    localStorage.setItem('token', token);
    this.headerService.closeAll();
    this.user$ = this.headerService
      .getUser()
      .subscribe((res) => { this.headerService.inCart = res.cart.length; });
  }
  ngOnDestroy(): void {
    if (this.registration$) {
      this.registration$.unsubscribe();
    }
    if (this.login$) {
      this.login$.unsubscribe();
    }
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }
}
