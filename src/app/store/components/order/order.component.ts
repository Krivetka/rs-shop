import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreItem } from '../../models/store-items';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../../core/services/header.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  private order$: Subscription | undefined;
  constructor(
    public headerService: HeaderService,
    public storeService: StoreService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getOrder();
    }
  }
  getOrder() {
    this.order$ = this.headerService.getUser().subscribe((res) => {
      console.log(res.orders)
      res.orders.items.forEach((item: any) =>
        this.storeService.getItem(item.id).subscribe((item: StoreItem) => {
          //this.storeService.itemsInCart.push(item);
        })
      );
    });
  }
  ngOnDestroy(): void {
    if (this.order$) {
      this.order$.unsubscribe();
    }
  }
}
