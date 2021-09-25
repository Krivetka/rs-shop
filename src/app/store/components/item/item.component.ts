import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { StoreItem } from '../../models/store-items';
import { HeaderService } from '../../../core/services/header.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
  itemInfo: StoreItem;
  private find$: Subscription | undefined;
  activeCategory = '';
  activeSubCategory = '';
  activeImg = '';
  private card$: Subscription | undefined;
  private item$: Subscription | undefined;
  private favorites$: Subscription | undefined;
  private route$: Subscription | undefined;
  private items$: Subscription | undefined;
  constructor(
    public headerService: HeaderService,
    public storeService: StoreService,
    private route: ActivatedRoute,
  ) {
    this.itemInfo = {
      id: '',
      name: '',
      imageUrls: [],
      rating: 0,
      availableAmount: 0,
      price: 0,
      description: '',
      isInCart: false,
      isFavorite: false,
      category: '',
      subCategory: '',
    };
  }

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe((params: Params) => {
      this.items$ = this.storeService.getItem(params.itemId).subscribe((res) => {
        this.itemInfo = res;
        if (!res.imageUrls[0]) {
          this.itemInfo.imageUrls = ['../../../../assets/no_image.jpg'];
        }
        this.activeImg = this.itemInfo.imageUrls[0];
        this.find$ = this.headerService.getItems().subscribe((el) => el.forEach((item) => {
          if (item.id === this.itemInfo.category) {
            this.activeCategory = item.name;
            item.subCategories.forEach((subCategory) => {
              if (subCategory.id === this.itemInfo.subCategory) {
                this.activeSubCategory = subCategory.name;
              }
            });
          }
        }));
      });
    });
  }
  addActiveImg(src: string) {
    this.activeImg = src;
  }
  addFavorites(id: string) {
    this.headerService.closeAll();
    this.favorites$ = this.storeService.postFavorites(id).subscribe(() => {
      this.item$ = this.storeService
        .getItem(this.itemInfo.id)
        .subscribe((res) => {
          this.itemInfo = res;
        });
    });
  }
  addCard(id: string) {
    this.headerService.closeAll();
    this.card$ = this.storeService.postCart(id).subscribe(() => {
      this.headerService.inCart += 1;
      this.item$ = this.storeService
        .getItem(this.itemInfo.id)
        .subscribe((res) => {
          this.itemInfo = res;
        });
    });
  }
  ngOnDestroy(): void {
    if (this.route$) {
      this.route$.unsubscribe();
    }
    if (this.find$) {
      this.find$.unsubscribe();
    }
    if (this.card$) {
      this.card$.unsubscribe();
    }
    if (this.item$) {
      this.item$.unsubscribe();
    }
    if (this.favorites$) {
      this.favorites$.unsubscribe();
    }
    if (this.items$) {
      this.items$.unsubscribe();
    }
  }
}
