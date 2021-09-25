import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CityMenuComponent } from './components/city-menu/city-menu.component';
import { FooterContactsComponent } from './components/footer-contacts/footer-contacts.component';
import { SocialNetworksComponent } from './components/social-networks/social-networks.component';
import { SearchComponent } from './components/search/search.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HeaderInfoComponent } from './components/header-info/header-info.component';
import { HeaderNavCategoryComponent } from './components/header-nav-category/header-nav-category.component';
import { AccountComponent } from './components/account/account.component';
import { AuthMenuComponent } from './components/auth-menu/auth-menu.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ContactsComponent,
    CityMenuComponent,
    FooterContactsComponent,
    SocialNetworksComponent,
    SearchComponent,
    CategoriesComponent,
    HeaderInfoComponent,
    HeaderNavCategoryComponent,
    AccountComponent,
    AuthMenuComponent,
    NotFoundComponent,
  ],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class CoreModule {}
