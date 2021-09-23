import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { StoreItem } from '../../models/store-items';
import { HeaderService } from '../../../core/services/header.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private route$: Subscription | undefined;
  private categories$: Subscription | undefined;
  sortingColumn = '';
  isDesc = true;
  activeClass = '';
  items: StoreItem[] = [];
  activeCategory = '';
  activeSubCategory: string | undefined;
  categoryId = '';
  subCategoryId: string | undefined;
  start = 0;
  count = 10;
  private find$: Subscription | undefined;
  private favorites$: Subscription | undefined;
  private card$: Subscription | undefined;
  constructor(
    public headerService: HeaderService,
    public storeService: StoreService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.find$ = this.headerService.getItems().subscribe((res) => res.forEach((item) => {
      if (item.id === this.route.snapshot.params.categoryId) {
        this.activeCategory = item.name;
        item.subCategories.forEach((subCategory) => {
          if (subCategory.id === this.route.snapshot.params.subCategoryId) {
            this.activeSubCategory = subCategory.name;
          }
        });
      }
    }));
    this.route$ = this.route.params.subscribe((res) => {
      this.categoryId = res.categoryId;
      if (res.subCategoryId) {
        this.subCategoryId = res.subCategoryId;
      }

      this.headerService.items.forEach((item) => {
        if (item.id === this.categoryId) {
          this.activeCategory = item.name;
          item.subCategories.forEach((subCategory) => {
            if (subCategory.id === this.route.snapshot.params.subCategoryId) {
              this.activeSubCategory = subCategory.name;
            }
          });
        }
      });
      this.getCategories();
    });
  }
  getCategories() {
    this.categories$ = this.storeService
      .getCategories(
        this.categoryId,
        this.start,
        this.count,
        this.subCategoryId,
        this.sortingColumn,
        this.isDesc,
      )
      .subscribe((el) => {
        this.items = el;
      });
  }
  addFavorites(id: string) {
    this.headerService.closeAll();
    this.favorites$ = this.storeService.postFavorites(id).subscribe(() => {
      this.categories$ = this.storeService
        .getCategories(
          this.categoryId,
          this.start,
          this.count,
          this.subCategoryId,
        )
        .subscribe((res) => {
          this.items = res;
        });
    });
  }
  addCard(id: string) {
    this.headerService.closeAll();
    this.card$ = this.storeService.postCart(id).subscribe(() => {
      this.headerService.inCart += 1;
      this.categories$ = this.storeService
        .getCategories(
          this.categoryId,
          this.start,
          this.count,
          this.subCategoryId,
        )
        .subscribe((res) => {
          this.items = res;
        });
    });
  }
  addMoreItems() {
    this.count += 10;
    this.categories$ = this.storeService
      .getCategories(
        this.categoryId,
        this.start,
        this.count,
        this.subCategoryId,
      )
      .subscribe((res) => {
        this.items = res;
      });
  }
  SortBy(sortingColumn: string) {
    this.sortingColumn = sortingColumn;
    this.isDesc = !this.isDesc;
    this.activeClass = sortingColumn;
    this.getCategories();
  }

  ngOnDestroy(): void {
    if (this.route$) {
      this.route$.unsubscribe();
    }
    if (this.categories$) {
      this.categories$.unsubscribe();
    }
    if (this.find$) {
      this.find$.unsubscribe();
    }
    if (this.favorites$) {
      this.favorites$.unsubscribe();
    }
    if (this.card$) {
      this.card$.unsubscribe();
    }
  }
}
