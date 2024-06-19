import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Titular } from 'src/app/models/funeraria/titular.model';
import { TitularService } from 'src/app/services/funeraria/titular.service';
import { Router } from '@angular/router';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  titulares: Titular[];
  theTitular: Titular;
  session = JSON.parse(localStorage.getItem('sesion'));
  constructor(
    private router: Router,
    private service: TitularService,
  ) {
    this.titulares = [];
  }

  ngOnInit() {

    this.guardarid();

  }

  guardarid() {
    // Obtener la sesión almacenada en localStorage
    const sesionString = localStorage.getItem('sesion');

    if (sesionString) {
      // Convertir la sesión de JSON a objeto JavaScript
      const sesion = JSON.parse(sesionString);

      // Obtener el email del objeto de sesión
      const emailLocalStorage = sesion.email;

      if (emailLocalStorage) {
        // Buscar el cliente con el email correspondiente
        this.service.list().subscribe(data => {
          const titular = data["data"];
          titular.password = "";
          const TitularEncontrado = titular.find(titular => titular.email === emailLocalStorage);

          if (TitularEncontrado) {
            // Si se encuentra el cliente, guardar su información en localStorage
            localStorage.setItem('TitularActivo', JSON.stringify(TitularEncontrado));
          } else {
            // Si no se encuentra el cliente, eliminar la información previamente guardada
            localStorage.removeItem('Titular');
          }
        });
      } else {
        // No hay email almacenado en la sesión
        console.error('No hay email almacenado en la sesión');
      }
    } else {
      // No hay sesión almacenada en localStorage
      console.error('No hay sesión almacenada en localStorage');
    }
  }

  listchats(){
    this.router.navigate(['chats/list'])
  }

  listPagos() {
    let titular = JSON.parse(localStorage.getItem("TitularActivo"))
    const id = titular.id
    this.router.navigate(['pagos/list'], { queryParams: { titular_id: id } });
  }

  listEjecuciones() {
    let titular = JSON.parse(localStorage.getItem("TitularActivo"))
    const id = titular.id
    this.router.navigate(['ejecucion/list'], { queryParams: { titular_id: id } });
  }

  listBeneficiarios() {
    let titular = JSON.parse(localStorage.getItem("TitularActivo"))
    const id = titular.id
    this.router.navigate(['beneficiarios/list'], { queryParams: { titular_id: id } });
  }

  listSuscripciones() {
    let titular = JSON.parse(localStorage.getItem("TitularActivo"))
    const id = titular.id
    this.router.navigate(['suscripciones/list'], { queryParams: { titular_id: id } });
  }

}
