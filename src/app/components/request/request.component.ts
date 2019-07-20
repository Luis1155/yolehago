import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RequestInterface } from '../../models/request';
import { RequestService } from 'src/app/services/request.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styles: []
})
export class RequestComponent implements OnInit {

  private requests: RequestInterface[];

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
    this.rService.addRequest(requestForm.value);
    requestForm.resetForm();
    this.router.navigate(['list-request']);
  }
}
