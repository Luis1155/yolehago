import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileInterface } from '../../models/profile';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: []
})
export class CompleteProfileComponent implements OnInit {

  constructor(public pService: ProfileService, private authService: AuthService, private router: Router, private storage: AngularFireStorage) { }

  @ViewChild('imageUser') inputImageUser: ElementRef;
  urlImage: Observable<string>;

  private profiles: ProfileInterface[];

  public profileAux: ProfileInterface = {
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

  ngOnInit() {

    this.getListProfiles();
    this.authService.isAuth().subscribe(user => {
      this.profileAux.idUser = user.uid;
      this.profileAux.email = user.email;
      this.profileAux.urlImagen = 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.icon-icons.com%2Ficons2%2F1378%2FPNG%2F512%2Favatardefault_92824.png&f=1';
    });
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }

  getListProfiles() {
    this.pService.getAllProfiles()
      .subscribe(profiles => {
        this.profiles = profiles;
      });
  }

  onSaveProfileAux(formProfile: NgForm): void {
    console.log(this.profileAux);
    this.pService.addProfile(this.profileAux);
    formProfile.resetForm();
    this.router.navigate(['profile']);
  }

  onSaveProfile(profileForm: NgForm): void {
    if (profileForm.value.id == null) {

      console.log('ID', profileForm.value.id);
      this.profileAux.nombre = profileForm.value.nombre;
      this.profileAux.apellidos = profileForm.value.apellidos;
      this.profileAux.celNumero = profileForm.value.celNumero;
      console.log('ProfileAux', this.profileAux);
      this.pService.addProfile(this.profileAux);

    } else {
      this.profileAux.nombre = profileForm.value.nombre;
      this.profileAux.apellidos = profileForm.value.apellidos;
      this.profileAux.celNumero = profileForm.value.celNumero;
      this.profileAux.id = profileForm.value.id;

      console.log('FORMULARIO', profileForm.value);
      console.log('UpdateProfile', this.profileAux);
      this.pService.updateProfile(this.profileAux);

    }
    this.router.navigate(['profile']);

    // profileForm.resetForm();
  }

}
