import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterContactsComponent } from './footer-contacts.component';

describe('FooterContactsComponent', () => {
  let component: FooterContactsComponent;
  let fixture: ComponentFixture<FooterContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterContactsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
