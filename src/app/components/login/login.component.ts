import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  public email = '';
  public password = '';
  public error: boolean;

  ngOnInit() {
  }

  onLoginUser(): void {
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
        this.error = false;
      }).catch(err => {
        this.error = true;
        console.log('err', err.message);
      }
      );
  }

  onLogout() {
    this.authService.logoutUser();
  }
  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }

}
