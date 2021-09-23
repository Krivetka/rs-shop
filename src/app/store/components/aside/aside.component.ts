import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { HeaderService } from '../../../core/services/header.service';
import { StoreItem } from '../../models/store-items';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit, OnDestroy {
  private aside$: Subscription | undefined;
  items: StoreItem[] = [];
  private card$: Subscription | undefined;
  private categories$: Subscription | undefined;
  private favorits: string[] = [];
  private delete$: Subscription | undefined;

  constructor(
    private storeService: StoreService,
    public headerService: HeaderService,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.getFavorits();
    }
  }
  getFavorits() {
    this.items = [];
    this.aside$ = this.headerService.getUser().subscribe((res) => {
      this.favorits = res.favorites;
      res.favorites.forEach((id: string) => this.storeService
        .getItem(id)
        .subscribe((item: StoreItem) => this.items.push(item)));
    });
  }
  addCard(id: string) {
    this.headerService.closeAll();
    this.card$ = this.storeService.postCart(id).subscribe(() => {
      this.headerService.inCart += 1;
      this.categories$ = this.storeService.getItem(id).subscribe((res) => this.items.forEach((el) => {
        if (el.id === res.id) {
          el.isInCart = true;
        }
      }));
    });
  }
  deleteFavorite(id: string) {
    this.headerService.closeAll();
    this.delete$ = this.storeService
      .deleteAside(id)
      .subscribe(() => this.getFavorits());
  }
  ngOnDestroy(): void {
    if (this.aside$) {
      this.aside$.unsubscribe();
    }
    if (this.card$) {
      this.card$.unsubscribe();
    }
    if (this.delete$) {
      this.delete$.unsubscribe();
    }
  }
}
