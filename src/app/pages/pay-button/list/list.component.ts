import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  handler: any;
  data: any;

  constructor() { }

  ngOnInit(): void {
    this.handler = (window as any).ePayco.checkout.configure({
      key: environment.epayco_public_key,
      test: true  // Cambiar a false en producción
    });

    this.data = {
      name: "Vestido Mujer Primavera",
      description: "Vestido Mujer Primavera",
      invoice: "FAC-1234",
      currency: "COP",
      amount: "5000",
      tax_base: "4000",
      tax: "500",
      tax_ico: "500",
      country: "CO",
      lang: "es",
      external: "false",
      extra1: "extra1",
      extra2: "extra2",
      extra3: "extra3",
      confirmation: "http://secure2.payco.co/prueba_curl.php",
      response: "http://secure2.payco.co/prueba_curl.php",
      name_billing: "Jhon Doe",
      address_billing: "Carrera 19 numero 14 91",
      type_doc_billing: "cc",
      mobilephone_billing: "3050000000",
      number_doc_billing: "100000000",
      email_billing: "jhondoe@epayco.com",
      methodsDisable: ["TDC", "PSE", "SP", "CASH", "DP"]
    };
  }

  pay(): void {
    if (this.handler) {
      this.handler.open(this.data);
    } else {
      console.error('ePayco handler is not configured');
    }
  }
}
