import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileInterface } from '../../models/profile';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: []
})
export class CompleteProfileComponent implements OnInit {

  constructor(public pService: ProfileService, private authService: AuthService, private router: Router) { }

  private profiles: ProfileInterface[];

  public profileAux: ProfileInterface = {
    idUser: '',
    email: '',
    nombre: '',
    apellidos: '',
    celNumero: '',
    urlImagen: ''
  };

  ngOnInit() {

    this.getListProfiles();
    this.authService.isAuth().subscribe(user => {
      this.profileAux.idUser = user.uid;
      this.profileAux.email = user.email;
      this.profileAux.urlImagen = 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F1378%2FPNG%2F512%2Favatardefault_92824.png&f=1';

    });
  }

  getListProfiles() {
    this.pService.getAllProfiles()
      .subscribe(profiles => {
        this.profiles = profiles;
      });
  }

  onSaveProfileAux(formProfile: NgForm): void{
    console.log(this.profileAux);
    this.pService.addProfile(this.profileAux);
    formProfile.resetForm();
    this.router.navigate(['profile']);
  }

  onSaveProfile(profileForm: NgForm): void {
    console.log('FORMULARIO', profileForm.value);
    if (profileForm.value.id == null) {
      // New
      this.pService.addProfile(profileForm.value);
      this.authService.isAuth().subscribe(user => {
        console.log('USER', user);
        user.updateProfile({
          displayName: this.pService.selectedProfile.id
        });
      });
    } else {
      // Update
      this.pService.updateProfile(profileForm.value);
    }
    profileForm.resetForm();
  }

}
