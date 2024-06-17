import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  session = JSON.parse(localStorage.getItem('sesion'));
  rolename = this.session.role.name;

  constructor() { }

  ngOnInit( ) {
    console.log(this.rolename)
  }

}
