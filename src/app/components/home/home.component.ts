import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  servicios: Servicio[] = [
    { nombre: 'Plomero', imagen: 'assets/img/plomero.jpg', descripcion: 'Instalaciones y Reparaciones' },
    { nombre: 'Generales', imagen: 'assets/img/arreglos-generales.jpg', descripcion: 'Soluciones para tu hogar' },
    { nombre: 'Electricista', imagen: 'assets/img/electricista.jpg', descripcion: 'Reparaciones con profesionales de confianza' },
    { nombre: 'Limpieza', imagen: 'assets/img/limpieza.jpg', descripcion: 'Limpieza general con los mejores productos' }
  ];
  constructor() { }

  ngOnInit() {
  }

}

export interface Servicio {
  nombre: string;
  imagen: string;
  descripcion: string;
}

