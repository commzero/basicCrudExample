import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login-component/login-component.component';
import { ListingComponent } from './components/listing-component/listing-component.component';
import { AddEditUserComponent } from './components/listing-component/add-edit-user-component/add-edit-user-component.component';
import { NavbarComponent } from './components/navbar-component/navbar-component.component';
import { LoginService } from './services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { UsersService } from './services/users.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// routes for this small app :D
const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: LoginComponent },
  { path: 'users', component: ListingComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListingComponent,
    NavbarComponent,
    AddEditUserComponent
  ],
  entryComponents: [
    AddEditUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    ToastNotificationsModule.forRoot(),
    InfiniteScrollModule
  ],
  providers: [
    LoginService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
