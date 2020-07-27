import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:type', component: UserComponent },
  { path: 'entries', loadChildren: () => import('src/app/entry/entry.module').then(m => m.EntryModule) }
];

export const routing = RouterModule.forRoot(APP_ROUTES);