import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { SearchResponse } from '../../models/search';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput:
  | ElementRef
  | undefined;
  searchResponse: SearchResponse[] = [];
  private search$: Subscription | undefined;
  private keyup$: Subscription | undefined;
  searchCategories: string[] = [];
  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
    if (this.searchInput) {
      this.keyup$ = fromEvent(this.searchInput.nativeElement, 'keyup')
        .pipe(
          map((event: any) => event.target.value),
          filter((res) => {
            if (res.length < 2) {
              this.headerService.isSearching = false;
            } else {
              return res;
            }
            return false;
          }),
          debounceTime(1000),
          distinctUntilChanged(),
        )
        .subscribe((text: string) => {
          this.headerService.isSearching = true;
          this.searchCategories = this.headerService.allCategory.filter(
            (el) => el.toLowerCase().includes(text.toLowerCase())
              && el.toLowerCase() !== text.toLowerCase(),
          );
          this.search$ = this.headerService.getSearch(text).subscribe(
            (res) => {
              this.searchResponse = res;
            },
          );
        });
    }
  }
  clearSearch() {
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
      this.headerService.isSearching = false;
    }
  }

  ngOnDestroy(): void {
    if (this.search$) {
      this.search$.unsubscribe();
    }
    if (this.keyup$) {
      this.keyup$.unsubscribe();
    }
  }
}
