import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileInterface } from '../../models/profile';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  constructor(private pService: ProfileService, private aRoute: ActivatedRoute, private authService: AuthService) { }

  public profiles: ProfileInterface[];

  public profileAux: ProfileInterface = {
    id: '',
    idUser: '',
    oficio: '',
    experiencia: ''
  };

  public modLabor = false;
  uidUser: string;

  ngOnInit() {

    this.getListProfiles();
    this.authService.isAuth().subscribe(user => {
      // console.log('user', user);
      this.profileAux.idUser = user.uid;
      // console.log(this.profileAux);
    });
  }

  // getProfile(idProfile: string): void {
  //   this.pService.getOneProfile(idProfile).subscribe(profile => {
  //     console.log(profile);
  //     this.profile = profile;
  //     console.log(this.profile);
  //   });
  // }

  getListProfiles() {
    this.pService.getAllProfiles()
      .subscribe(profiles => {
        this.profiles = profiles;
      });
  }

  onLabor(): void {
    this.modLabor = !this.modLabor;
  }

  onPreUpdateProfile( profile: ProfileInterface ) {
    console.log('PROFILESelect', profile);
    this.pService.selectedProfile = Object.assign({}, profile);
  }
}
