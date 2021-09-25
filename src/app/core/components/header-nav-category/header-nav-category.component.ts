import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header-nav-category',
  templateUrl: './header-nav-category.component.html',
  styleUrls: ['./header-nav-category.component.scss'],
})
export class HeaderNavCategoryComponent implements OnInit {
  constructor(public headerService: HeaderService) { }

  ngOnInit(): void {
  }
}
