import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conductor } from 'src/app/models/funeraria/conductor.model';
import { ConductorService } from 'src/app/services/funeraria/conductor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  conductores: Conductor[];
  theConductor: Conductor;

  constructor(private service: ConductorService, private router: Router) 
  {
    this.conductores = [];
   }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.conductores = data["data"];
      console.log(JSON.stringify(this.conductores));
    });
  }

  view(id: number) {
    console.log("id: "+id);
    this.router.navigate(['conductores/view/'+id]);
  }

  update(id: number) {
    this.router.navigate(['conductores/update/'+id]);
  }

  create() {
    console.log("create");
    this.router.navigate(['conductores/create']);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Conductor',
      text: "Está seguro que quiere eliminar el conductor?",
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
              'El conductor ha sido eliminado.',
              'success'
            );
            this.list();
          });
      }
    });
  }

}
