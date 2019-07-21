import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ProfileInterface } from '../../models/profile';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styles: []
})
export class LaborComponent implements OnInit {

  constructor(public pService: ProfileService, private authService: AuthService, private router: Router, private storage: AngularFireStorage) { }

  @ViewChild('imageUser') inputImageUser: ElementRef;
  urlImage: Observable<string>;

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
    experiencia: '',
    anexo: ''
  };


  public ID: '';

  ngOnInit() {
    this.getListProfiles();
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `anexos/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
    // this.profileAux.urlImagen = this.inputImageUser.nativeElement.value;

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
    this.profileAux.anexo = this.inputImageUser.nativeElement.value;
    console.log('Update', this.profileAux);

    this.pService.updateProfile(this.profileAux);
    this.router.navigate(['home']);
  }



}
