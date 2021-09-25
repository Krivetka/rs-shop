import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../models/user-info';
import { HeaderService } from '../../../core/services/header.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() order: Order | undefined;
  id = '';
  items: { id: string; amount: number }[] = [];
  name = '';
  address = '';
  phone = '';
  timeToDeliver = '';
  comment = '';
  isList = false;
  private order$: Subscription | undefined;
  orderControl: FormGroup;
  private change$: Subscription | undefined;
  constructor(
    public headerService: HeaderService,
    public storeService: StoreService,
  ) {
    this.orderControl = new FormGroup({});
  }

  ngOnInit(): void {
    if (this.order) {
      this.id = this.order.id;
      this.items = this.order.items;
      this.name = this.order.details.name;
      this.address = this.order.details.address;
      this.phone = this.order.details.phone;
      this.timeToDeliver = this.order.details.timeToDeliver;
      this.comment = this.order.details.comment;
    }
    this.orderControl = new FormGroup({
      fullName: new FormControl(this.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      deliveryAddress: new FormControl(this.address, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250),
      ]),
      phoneNumber: new FormControl(this.phone, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
        Validators.pattern('^[0-9+ ]*$'),
      ]),
      comment: new FormControl(this.comment, [Validators.maxLength(250)]),
    });
  }
  setList() {
    this.isList = !this.isList;
  }
  deleteOrder() {
    this.storeService.deleteOrder(this.id).subscribe(() => {
      this.getOrder();
    });
  }
  putOrder() {
    if (this.orderControl.valid) {
      const putBody = {
        id: this.id,
        details: {
          name: this.orderControl.value.fullName,
          address: this.orderControl.value.deliveryAddress,
          phone: this.orderControl.value.phoneNumber,
          timeToDeliver: this.timeToDeliver,
          comment: this.orderControl.value.comment,
        },
      };
      this.name = putBody.details.name;
      this.address = putBody.details.address;
      this.phone = putBody.details.phone;
      this.comment = putBody.details.comment;
      this.change$ = this.storeService.putOrder(putBody).subscribe(() => {
        this.storeService.isChangeOrder = false;
      });
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
    if (this.change$) {
      this.change$.unsubscribe();
    }
  }
}
