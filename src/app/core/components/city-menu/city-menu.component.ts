import { Component, DoCheck, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { BIG_CITIES_IN_BY } from '../../constants/core.constants';

@Component({
  selector: 'app-city-menu',
  templateUrl: './city-menu.component.html',
  styleUrls: ['./city-menu.component.scss'],
})
export class CityMenuComponent implements OnInit, DoCheck {
  citiesResponse: string[] = [];
  city = '';
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {}
  ngDoCheck(): void {
    this.citiesResponse = BIG_CITIES_IN_BY.filter((el) => {
      if (this.city) {
        return (
          el.toLowerCase().includes(this.city.toLowerCase())
          && el.toLowerCase() !== this.city.toLowerCase()
        );
      }
      return 0;
    });
  }

  setCity(city: string) {
    this.city = city;
  }
  sentCity() {
    this.headerService.userCity = this.city;
    this.headerService.setCityMenu(false);
  }
}
