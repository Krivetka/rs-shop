import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../../services/header.service';
import { CITIES_FOR_IP } from '../../constants/core.constants';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.scss'],
})
export class HeaderInfoComponent implements OnInit, OnDestroy {
  private ip$: Subscription | undefined;
  constructor(public headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.loadUserInfo();
    if (this.headerService.streamCity$) {
      this.ip$ = this.headerService.streamCity$.subscribe((response: any) => {
        this.headerService.userCity = CITIES_FOR_IP[response.city as keyof object] || response.city;
      });
    }
  }
  ngOnDestroy(): void {
    if (this.ip$) {
      this.ip$.unsubscribe();
    }
  }
}
