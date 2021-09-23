import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  CITY_URL_KEY,
  GET_CITY_URL,
  GET_IP_URL,
} from '../constants/core.constants';
import { Category } from '../models/categories';
import { SearchResponse } from '../models/search';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  inCart = 0;
  userCity = 'Ваш город...';
  streamCity$: Observable<any> | undefined;
  items: Category[] = [];
  allCategory: string[] = [];
  activeCategory: string | undefined;
  activeCategoryId: string | undefined;
  subcategory: [{ id: 'string'; name: 'string' }] | undefined;
  isCityMenu = false;
  isMore = false;
  isCategories = false;
  isSearching = false;
  isAccount = false;
  isAuthMenu = false;
  isLoginMenu = true;
  constructor(private httpClient: HttpClient, private router: Router) {}

  loadUserInfo() {
    this.streamCity$ = this.httpClient.get(GET_IP_URL).pipe(
      switchMap((value: any) => this.httpClient.get(GET_CITY_URL + value.ip + CITY_URL_KEY)),
    );
  }
  setCityMenu(is: boolean) {
    this.closeAll();
    this.isCityMenu = is;
  }
  closeCityMenu(ev: any) {
    if (ev.className === 'city-menu-field') {
      this.isCityMenu = false;
    }
  }
  setIsSearch() {
    if (!this.isSearching) {
      this.closeAll();
    } else {
      this.closeAll();
      this.isSearching = true;
    }
  }
  setIsMore(is: boolean) {
    this.closeAll();
    this.isMore = is;
  }
  setIsAuthMenu(is: boolean) {
    this.closeAll();
    this.isAuthMenu = is;
    this.router.navigate(['/']);
  }
  closeAuthMenu(ev: any) {
    if (ev.className === 'auth-menu-field') {
      this.isAuthMenu = false;
      this.router.navigate(['/']);
    }
  }
  setCategories(is: boolean) {
    this.closeAll();
    this.isCategories = is;
  }
  setIsAccount(is: boolean) {
    this.closeAll();
    this.isAccount = is;
  }
  getItems(): Observable<Category[]> {
    return this.httpClient.get<Category[]>('http://localhost:3004/categories');
  }
  getSearch(text: string): Observable<SearchResponse[]> {
    return this.httpClient.get<SearchResponse[]>(
      `http://localhost:3004/goods/search?text=${text}`,
    );
  }
  postToken(userInfo: UserInfo): Observable<{ token: 'string' }> {
    return this.httpClient.post<{ token: 'string' }>(
      'http://localhost:3004/users/register',
      userInfo,
    );
  }
  postAuth(userInfo: UserInfo): Observable<{ token: 'string' }> {
    return this.httpClient.post<{ token: 'string' }>(
      'http://localhost:3004/users/register',
      { login: userInfo.login, password: userInfo.password },
    );
  }
  getUser(): Observable<any> {
    const autorization = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return this.httpClient
      .get<any>('http://localhost:3004/users/userInfo', {
      headers: autorization,
    })
      .pipe(catchError(async () => localStorage.removeItem('token')));
  }
  closeAll() {
    this.isCityMenu = false;
    this.isMore = false;
    this.isCategories = false;
    this.isSearching = false;
    this.isAccount = false;
    this.isAuthMenu = false;
  }
}
