import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/funeraria/plan.model';
import { PlanService } from 'src/app/services/funeraria/plan.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  planes: Plan[];
  thePlan: Plan;

  constructor(
    private service: PlanService,
    private router: Router
  ) {
    this.planes = [];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.list().subscribe(data => {
      this.planes = data["data"];
      console.log(JSON.stringify(this.planes));
    });
  }

  view(id: number) {
    console.log("id: " + id);
    this.router.navigate(['planes/view/' + id]);
  }

  update(id: number) {
    this.router.navigate(['planes/update/' + id]);
  }

  create() {
    this.router.navigate(['planes/create']);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar Plan',
      text: "Está seguro que quiere eliminar el plan?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El plan ha sido eliminado correctamente',
            'success'
          )
          this.list();
        });
      }
    });
  }

}
