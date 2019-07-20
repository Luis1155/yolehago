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

  constructor(private pService: ProfileService, private authService: AuthService, private router: Router) { }

  public profiles: ProfileInterface[];

  public profileAux: ProfileInterface = {
    id: '',
    idUser: '',
    oficio: '',
    experiencia: ''
  };

  ngOnInit() {
    this.getListProfiles();
    this.authService.isAuth().subscribe(user => {
      this.profileAux.idUser = user.uid;
      console.log('OnInit', this.profileAux);
    });
  }

  getListProfiles() {
    this.pService.getAllProfiles()
      .subscribe(profiles => {
        this.profiles = profiles;
      });
  }

  onUpdateLabor(formProfile: NgForm): void {
    console.log(formProfile.value);
    console.log('Update',this.profileAux);

    // this.dataApi.updateBook(this.profileAux);
    // formProfile.resetForm();
    // this.router.navigate(['list-request']);
  }

}
