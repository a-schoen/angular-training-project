import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidateEqualModule } from 'ng-validate-equal';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { EntryDataService } from './entry/services/entry-data.service';
import { UserService } from './user/user.service';
import { userStatusReducer } from './user/store/user.reducer';
import { UserEffects } from './user/store/user.effects';
import { entryListReducer } from './entry/store/entry.reducer';
import { EntryEffects } from './entry/store/entry.effects';

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
    StoreModule.forRoot({
      entries: entryListReducer,
      loginStatus: userStatusReducer
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([
      EntryEffects,
      UserEffects
    ]),
    routing
  ],
  providers: [
    EntryDataService,
    UserService,
    EntryEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
