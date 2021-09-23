import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../services/header.service';
import { Category } from '../../models/categories';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private itemsSub$: Subscription | undefined;
  private user$: Subscription | undefined;
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.user$ = this.headerService
        .getUser()
        .subscribe((res) => { this.headerService.inCart = res.cart.length; });
    }
    this.itemsSub$ = this.headerService
      .getItems()
      .subscribe((res: Category[]) => {
        this.headerService.items = res;
        this.headerService.activeCategory = res[0].name;
        this.headerService.activeCategoryId = res[0].id;
        this.headerService.subcategory = res[0].subCategories;
        res.forEach((elem) => elem.subCategories.forEach((subcategory) => this.headerService.allCategory.push(
          `${elem.id}.${subcategory.id}.${subcategory.name}`,
        )));
      });
  }

  ngOnDestroy(): void {
    if (this.itemsSub$) {
      this.itemsSub$.unsubscribe();
    }
  }
}
