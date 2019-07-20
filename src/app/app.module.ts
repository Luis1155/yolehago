import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { APPROUTING } from './app.routes';

import { environment } from '../environments/environment';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LaborComponent } from './components/labor/labor.component';
import { RequestComponent } from './components/request/request.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { ListRequestComponent } from './components/list-request/list-request.component';
import { ListWorkersComponent } from './components/list-workers/list-workers.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    LaborComponent,
    RequestComponent,
    CompleteProfileComponent,
    ListRequestComponent,
    ListWorkersComponent
  ],
  imports: [
    BrowserModule,
    APPROUTING,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
