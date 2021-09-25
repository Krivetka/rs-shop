import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { BANNER_IMG } from '../../constants/store.constants';

SwiperCore.use([Autoplay, Pagination]);
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  banner = BANNER_IMG;
  constructor() {}

  ngOnInit(): void {}
}
