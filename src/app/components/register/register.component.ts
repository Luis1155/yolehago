import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProfileInterface } from '../../models/profile';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private pService: ProfileService) { }

  public email = '';
  public password = '';

  public errorPassword = false;
  private profile: ProfileInterface;

  ngOnInit() {
  }

  onAddUser() {
    this.authService.registesUser(this.email, this.password)
      .then((res) => {
        this.router.navigate(['complete-profile']);
        console.log('Aqui estoy 1');
      }).catch(err => {
        console.log('err', err.message);
        console.log('Aqui estoy');
        this.errorPassword = true;
      });
  }
}
