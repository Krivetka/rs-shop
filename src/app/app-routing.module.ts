import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from './store/store.module';
import { CategoriesComponent } from './store/components/categories/categories.component';
import { ItemComponent } from './store/components/item/item.component';
import { AuthMenuComponent } from './core/components/auth-menu/auth-menu.component';
import { CartComponent } from './store/components/cart/cart.component';
import { AsideComponent } from './store/components/aside/aside.component';
import { OrderComponent } from './store/components/order/order.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { MainComponent } from './store/components/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'auth', component: AuthMenuComponent },
  { path: 'goods/item/:itemId', component: ItemComponent },
  { path: 'goods/:categoryId', component: CategoriesComponent },
  { path: 'goods/:categoryId/:subCategoryId', component: CategoriesComponent },
  { path: 'cart', component: CartComponent },
  { path: 'aside', component: AsideComponent },
  { path: 'order', component: OrderComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), StoreModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
