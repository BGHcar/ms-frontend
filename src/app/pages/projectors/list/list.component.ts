import { Component, OnInit } from '@angular/core';
import { Projector } from 'src/app/models/projector.model';
import { ProjectorService } from 'src/app/services/projector.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  projector: Projector;
  projectors: Projector[];


  constructor(
    private service: ProjectorService,
    private router: Router
  ) {
    this.projector = { id: 0, brand: '', high: 0, width: 0 }
    this.projectors = [];
   }

  ngOnInit(): void {
  }


  list(){
    this.router.navigate(['/projectors']);
  }

}
