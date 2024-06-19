import { Component, OnInit } from '@angular/core';
import { MusicaService } from 'src/app/services/musica.service';
import { Musica } from 'src/app/models/musica.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  musica: Musica[];
  theMusica: Musica;

  constructor(
    private service: MusicaService,
    private router: Router
  ) {
    this.musica = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.service.list().subscribe(data => {
      this.musica = data;
    });
  }

  create(): void {
    this.router.navigate(['musica/create']);
  }

}
