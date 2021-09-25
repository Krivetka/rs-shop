import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation } from 'swiper';
import { POPULAR_GOODS } from '../../constants/store.constants';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  sliderItems = POPULAR_GOODS;
  constructor() {}

  ngOnInit(): void {}
}
