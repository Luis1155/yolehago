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


  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        const auxId = user.uid;
        console.log('auxID', auxId);
        console.log('USER', user);
        // this.getProfile(auxId);
        this.profile.nombre = user.displayName;
        this.profile.email = user.email;
      }
    });


  }

  getProfile(idProfile: string): void {
    this.pService.getOneProfile(idProfile).subscribe(profile => {
      console.log(profile);
      this.profile = profile;
      console.log(this.profile);
    });
  }


}
