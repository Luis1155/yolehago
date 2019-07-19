import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public email: string = '';
  public password: string = '';

  ngOnInit() {
  }

  onAddUser() {
    this.authService.registesUser(this.email, this.password)
      .then((res) => {
        this.router.navigate(['complete-profile']);
        console.log('Aqui estoy 1');
      }).catch(err => {
        console.log('err', err.message)
        console.log('Aqui estoy');
      });
  }

}
