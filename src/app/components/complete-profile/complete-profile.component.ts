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

    this.getListProfiles();
    this.authService.isAuth().subscribe(user => {
      this.pService.selectedProfile.idUser = user.uid;
      this.pService.selectedProfile.email = user.email;
      this.pService.selectedProfile.urlImagen = 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff7%2FNeon-logo.svg%2F1200px-Neon-logo.svg.png&f=1';

    })

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
