import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SliderComponent } from './components/slider/slider.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ItemComponent } from './components/item/item.component';
import { CartComponent } from './components/cart/cart.component';
import { AsideComponent } from './components/aside/aside.component';
import { OrderComponent } from './components/order/order.component';
import { CartFormComponent } from './components/cart-form/cart-form.component';
import { MainComponent } from './components/main/main.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  declarations: [
    SliderComponent,
    BannerComponent,
    CategoriesComponent,
    ItemComponent,
    CartComponent,
    AsideComponent,
    OrderComponent,
    CartFormComponent,
    MainComponent,
    OrderItemComponent,
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
  ],
})
export class StoreModule {}
