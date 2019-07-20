import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileInterface } from '../../models/profile';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  constructor(private pService: ProfileService, private aRoute: ActivatedRoute, private authService: AuthService) { }

  profile: ProfileInterface = {
    id: '',
    email: '',
    nombre: '',
    apellidos: '',
    celNumero: '',
    urlImagen: ''
  }

  uidUser: string;

  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      this.uidUser = user.uid;
    });
    this.getProfile('lEMA5fK6JfLPAU9ZR4D1');

  }

  getProfile(idProfile: string): void {
    this.pService.getOneProfile(idProfile).subscribe(profile => {
      console.log(profile);
      this.profile = profile;
      console.log(this.profile);
    });
  }


}
