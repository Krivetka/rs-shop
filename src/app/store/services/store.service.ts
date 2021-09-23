import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StoreItem } from '../models/store-items';
import { BASE_URL } from '../constants/store.constants';
import { UserFormInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  isCartForm = false;
  itemsInCart: StoreItem[] = [];
  constructor(private httpClient: HttpClient, private router: Router) {}
  closeCartForm(ev: any) {
    if (ev.className === 'cart-form-field') {
      this.isCartForm = false;
    }
  }
  getAutorization() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
  getCategories(
    categoryId: string,
    start: number,
    count: number,
    subCategoryId?: string,
    sortBy?: string,
    reverse?: boolean,
  ): Observable<StoreItem[]> {
    let path = categoryId;

    if (subCategoryId) {
      path = `${categoryId}/${subCategoryId}`;
    }
    if (sortBy && reverse !== undefined) {
      const params = new HttpParams().set('sortBy', sortBy).set('reverse', reverse);
      return this.httpClient.get<StoreItem[]>(
        `${BASE_URL}goods/category/${path}?start=${start}&count=${count}`,
        { headers: this.getAutorization(), params },
      );
    }
    return this.httpClient.get<StoreItem[]>(
      `${BASE_URL}goods/category/${path}?start=${start}&count=${count}`,
      { headers: this.getAutorization() },
    );
  }
  getItem(itemId: string): Observable<StoreItem> {
    return this.httpClient.get<StoreItem>(`${BASE_URL}goods/item/${itemId}`, {
      headers: this.getAutorization(),
    });
  }
  postFavorites(id: string) {
    return this.httpClient
      .post(
        `${BASE_URL}users/favorites`,
        { id },
        { headers: this.getAutorization() },
      )
      .pipe(catchError(async () => this.router.navigate(['auth'])));
  }

  postCart(id: string) {
    return this.httpClient
      .post(
        `${BASE_URL}users/cart`,
        { id },
        { headers: this.getAutorization() },
      )
      .pipe(catchError(async () => this.router.navigate(['auth'])));
  }
  deleteAside(id: string) {
    return this.httpClient.delete(`${BASE_URL}users/favorites?id=${id}`, {
      headers: this.getAutorization(),
    });
  }
  deleteCardItem(id: string) {
    return this.httpClient.delete(`${BASE_URL}users/cart?id=${id}`, {
      headers: this.getAutorization(),
    });
  }
  postOrder(formInfo: UserFormInfo) {
    const cart: { id: string; amount: number }[] = [];
    const info = {
      name: formInfo.fullName,
      address: formInfo.deliveryAddress,
      phone: formInfo.phoneNumber,
      timeToDeliver: `${formInfo.deliveryDate.getDate()}.${
        formInfo.deliveryDate.getMonth() + 1
      }.${formInfo.deliveryDate.getFullYear()} ${formInfo.deliveryTime}`,
      comment: formInfo.comment,
    };
    this.itemsInCart.forEach((item) => {
      if (item.count) {
        cart.push({ id: item.id, amount: item.count });
      }
    });
    return this.httpClient.post(
      `${BASE_URL}users/order`,
      { items: cart, details: info },
      { headers: this.getAutorization() },
    );
  }
}
