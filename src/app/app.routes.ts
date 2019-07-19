import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestComponent } from './components/request/request.component';
import { LaborComponent } from './components/labor/labor.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';

const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'request', component: RequestComponent },
  { path: 'labor', component: LaborComponent },
  { path: 'complete-profile', component: CompleteProfileComponent},
  { path: '**', pathMatch:  'full', redirectTo: 'home' }
];

export const APPROUTING = RouterModule.forRoot(ROUTES);
