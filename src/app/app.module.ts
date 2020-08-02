import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidateEqualModule } from 'ng-validate-equal';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { UserComponent } from './user/user.component';
import { EntryDataService } from './entry/entry-data.service';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidateEqualModule,
    routing
  ],
  providers: [
    EntryDataService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
