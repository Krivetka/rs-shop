import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityMenuComponent } from './city-menu.component';

describe('CityMenuComponent', () => {
  let component: CityMenuComponent;
  let fixture: ComponentFixture<CityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityMenuComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
