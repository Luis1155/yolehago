import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestComponent } from './components/request/request.component';
import { LaborComponent } from './components/labor/labor.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';
import { ListRequestComponent } from './components/list-request/list-request.component';
import { ListWorkersComponent } from './components/list-workers/list-workers.component';
import { HelpComponent } from './components/help/help.component';

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'request', component: RequestComponent },
  { path: 'labor', component: LaborComponent },
  { path: 'help', component: HelpComponent },
  { path: 'complete-profile', component: CompleteProfileComponent},
  { path: 'list-request', component: ListRequestComponent},
  { path: 'list-workers', component: ListWorkersComponent},
  { path: '**', pathMatch:  'full', redirectTo: 'home' }
];

export const APPROUTING = RouterModule.forRoot(ROUTES);
