import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../../core/services/header.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  private order$: Subscription | undefined;

  constructor(
    public headerService: HeaderService,
    public storeService: StoreService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getOrder();
    }
  }
  getOrder() {
    this.order$ = this.headerService.getUser().subscribe((res) => {
      this.storeService.orders = res.orders;
    });
  }
  ngOnDestroy(): void {
    if (this.order$) {
      this.order$.unsubscribe();
    }
  }
}
