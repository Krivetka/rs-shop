import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DELIVERY_TIME } from '../../constants/store.constants';
import { StoreService } from '../../services/store.service';
import { HeaderService } from '../../../core/services/header.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss'],
})
export class CartFormComponent implements OnInit, OnDestroy {
  cartControl: FormGroup;
  minDate = new Date();
  deliveryTime = DELIVERY_TIME;
  private form$: Subscription | undefined;
  constructor(public storeService: StoreService, private headerService: HeaderService, private router: Router) {
    this.cartControl = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      deliveryAddress: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250),
      ]),
      phoneNumber: new FormControl('+', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
        Validators.pattern('^[0-9+ ]*$'),
      ]),
      deliveryDate: new FormControl(new Date(), [Validators.required]),
      deliveryTime: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.maxLength(250)]),
    });
  }

  ngOnInit(): void {}
  sentForm() {
    if (this.cartControl.valid) {
      this.form$ = this.storeService
        .postOrder(this.cartControl.value)
        .subscribe(() => {
          this.storeService.isCartForm = false;
          this.headerService.inCart = 0;
          this.router.navigate(['/']);
        });
    }
  }
  ngOnDestroy(): void {
    if (this.form$) {
      this.form$.unsubscribe();
    }
  }
}
