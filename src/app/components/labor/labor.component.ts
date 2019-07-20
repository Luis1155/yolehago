import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileInterface } from '../../models/profile';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styles: []
})
export class LaborComponent implements OnInit {

  constructor(public pService: ProfileService, private authService: AuthService, private router: Router) { }

  public profiles: ProfileInterface[];

  public profileAux: ProfileInterface = {
    id: '',
    oficio: '',
    experiencia: ''
  };
  public profileAux1: ProfileInterface = {
    id: '',
    idUser: '',
    email: '',
    nombre: '',
    apellidos: '',
    celNumero: '',
    urlImagen: '',
    oficio: '',
    experiencia: ''
  };


  public ID: '';

  ngOnInit() {
    this.getListProfiles();
  }

  getListProfiles() {
    this.pService.getAllProfiles()
      .subscribe(profiles => {
        this.profiles = profiles;
      });
  }

  onUpdateLabor(formProfile: NgForm): void {
    console.log(formProfile.value);
    this.profileAux.id = formProfile.value.id;
    this.profileAux.oficio = formProfile.value.oficio;
    this.profileAux.experiencia = formProfile.value.experiencia;
    console.log('Update', this.profileAux);

    this.pService.updateProfile(this.profileAux);
    this.router.navigate(['home']);
  }



}
