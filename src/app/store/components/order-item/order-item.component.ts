import { Component, Input, OnInit } from '@angular/core';
import { StoreItem } from '../../models/store-items';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input() itemInfo: { id: string; amount: number } | undefined;
  itemName = '';
  itemCount = 1;
  itemPrice = 0;
  constructor(public storeService: StoreService) {}
  ngOnInit(): void {
    if (this.itemInfo) {
      this.itemCount = this.itemInfo.amount;
      this.storeService
        .getItem(this.itemInfo.id)
        .subscribe((item: StoreItem) => {
          this.itemName = item.name;
          this.itemPrice = +(this.itemCount * item.price).toFixed(2);
        });
    }
  }
}
