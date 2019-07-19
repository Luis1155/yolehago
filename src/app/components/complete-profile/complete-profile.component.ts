import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
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

  @ViewChild('nombre') nombre: string;
  @ViewChild('apellidos') apellidos: string;
  @ViewChild('celNumber') celNumber: string;

  ngOnInit() {

    // this.getListProfiles();

  }

  onCompleteUser() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        user.updateProfile({
          displayName: this.nombre + this.apellidos
        }).then(() => {
          this.router.navigate(['home']);
        }).catch((error) => console.log('error', error));
      }
    });
  }

  getListProfiles() {
    this.pService.getAllProfiles()
      .subscribe(profiles => {
        this.profiles = profiles;
      });
  }

  onSaveProfile(profileForm: NgForm): void {
    console.log('FORMULARIO', profileForm.value);
    if (profileForm.value.id == null) {
      // New
      this.pService.addProfile(profileForm.value);
    } else {
      // Update
      this.pService.updateProfile(profileForm.value);
    }
    profileForm.resetForm();
  }

}
