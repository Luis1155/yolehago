import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequestInterface } from '../../models/request';
import { RequestService } from 'src/app/services/request.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styles: []
})
export class RequestComponent implements OnInit {

  private requests: RequestInterface[];

  public campoVacio = false;

  private req: RequestInterface = {
    categoria: '',
    descripcion: '',
    direccion: '',
    numeroCon: ''
  };

  constructor(private rService: RequestService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getListRequests();

  }

  getListRequests() {
    this.rService.getAllRequest()
      .subscribe(requests => {
        this.requests = requests;
      });
  }

  onSaveRequest(requestForm: NgForm): void {
    console.log('FORMULARIO', requestForm.value);

    if (requestForm.value.categoria !== '') {

      if (requestForm.value.descripcion !== '') {

        if (requestForm.value.direccion !== '') {

          if (requestForm.value.numeroCon !== '') {
            this.rService.addRequest(requestForm.value);
            requestForm.resetForm();
            this.router.navigate(['list-request']);
          } else {
            this.campoVacio = true;
          }
        } else {
          this.campoVacio = true;
        }
      } else {
        this.campoVacio = true;
      }
    } else {
      this.campoVacio = true;
    }
  }
}
