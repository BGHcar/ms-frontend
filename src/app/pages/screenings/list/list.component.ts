import { Component, OnInit } from '@angular/core';
import { Screening } from 'src/app/models/screening.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  Screening: Screening[];
  theScreening: Screening;
  columnsName = ['movie', 'theater', 'date', 'time', 'price'];

  constructor() { }

  ngOnInit(): void {
  }

}
