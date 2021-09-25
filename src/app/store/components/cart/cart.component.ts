import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../../core/services/header.service';
import { StoreService } from '../../services/store.service';
import { StoreItem } from '../../models/store-items';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  private user$: Subscription | undefined;
  private cart$: Subscription | undefined;
  private favorites$: Subscription | undefined;
  private delete$: Subscription | undefined;
  private item$: Subscription | undefined;

  constructor(
    public headerService: HeaderService,
    public storeService: StoreService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getCart();
    }
  }
  getCart() {
    this.storeService.itemsInCart = [];
    this.cart$ = this.headerService.getUser().subscribe((res) => {
      res.cart.forEach((id: string) => {
        this.item$ = this.storeService
          .getItem(id)
          .subscribe((item: StoreItem) => {
            item.count = 1;
            this.storeService.itemsInCart.push(item);
          });
      });
    });
  }
  countMinus(item: StoreItem) {
    if (item.count) {
      item.count -= 1;
    }
  }
  isMin(item: StoreItem) {
    if (item.count) {
      return item.count < 2;
    }
    return false;
  }
  countPlus(item: StoreItem) {
    if (item.count) {
      item.count += 1;
    }
  }
  isMax(item: StoreItem) {
    if (item.count) {
      return item.count >= item.availableAmount;
    }
    return false;
  }
  getSum(item: StoreItem) {
    if (item.count) {
      return (item.count * item.price).toFixed(2);
    }
    return 0;
  }
  getTotal() {
    let sum = 0;
    this.storeService.itemsInCart.forEach((item) => {
      if (item.count) {
        sum += item.price * item.count;
      }
    });
    return sum.toFixed(2);
  }
  addFavorites(id: string) {
    this.headerService.closeAll();
    this.favorites$ = this.storeService
      .postFavorites(id)
      .subscribe(() => this.getCart());
  }
  deleteCartItem(id: string) {
    this.headerService.closeAll();
    this.headerService.inCart -= 1;
    this.delete$ = this.storeService
      .deleteCardItem(id)
      .subscribe(() => this.getCart());
  }
  ngOnDestroy(): void {
    if (this.user$) {
      this.user$.unsubscribe();
    }
    if (this.cart$) {
      this.cart$.unsubscribe();
    }
    if (this.favorites$) {
      this.favorites$.unsubscribe();
    }
    if (this.delete$) {
      this.delete$.unsubscribe();
    }
    if (this.item$) {
      this.item$.unsubscribe();
    }
  }
}
