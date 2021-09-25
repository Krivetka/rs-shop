import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavCategoryComponent } from './header-nav-category.component';

describe('HeaderNavCategoryComponent', () => {
  let component: HeaderNavCategoryComponent;
  let fixture: ComponentFixture<HeaderNavCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderNavCategoryComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNavCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
