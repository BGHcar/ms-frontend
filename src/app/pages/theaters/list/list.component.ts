import { Component, OnInit } from '@angular/core';
import { Theater } from 'src/app/models/theater.model';
import { Router } from '@angular/router';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  theaters: Theater[];
  theTheater: Theater;
  columnsName = ['location', 'capacity'];


  constructor(private service: TheaterService, private router: Router) {
    this.theaters = [];
    this.columnsName = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.theaters = data["data"];
      console.log(JSON.stringify(this.theaters));
    });
  }

  view(id: number) {
    this.router.navigate(['theaters/view/'+id]);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Estudiante',
      text: "Está seguro que quiere eliminar el estudiante?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El estudiante ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  };


  update(id: number) {
    this.router.navigate(['theaters/update/'+id]);
  }

  create() {
    this.router.navigate(['theaters/create']);
  }

}
