import { Component, OnInit } from '@angular/core';
import { TipoService } from 'src/app/services/tipo.service';
import { Tipo } from 'src/app/models/tipo.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tipos: Tipo[];
  theTipo: Tipo;

  constructor(
    private service: TipoService,
    private router: Router
  ) {
    this.tipos = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.service.list().subscribe(data => {
      console.log(data["data"]);
      this.tipos = data;
    });
  }

}
