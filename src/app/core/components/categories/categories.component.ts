import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  activeDiv: Element | null | undefined;
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
  }
  addActive(event: any) {
    if (!this.activeDiv) {
      this.activeDiv = document.querySelector(`#${this.headerService.items[0].id}`);
    }
    if (this.activeDiv) {
      this.activeDiv.classList.remove('active-category');
    }
    event.target.classList.add('active-category');
    this.activeDiv = event.target;
    this.headerService.items.forEach((res) => {
      if (res.id === event.target.id) {
        this.headerService.activeCategory = res.name;
        this.headerService.activeCategoryId = res.id;
        this.headerService.subcategory = res.subCategories;
      }
    });
  }
}
