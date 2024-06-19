import { Component, OnInit } from '@angular/core';

interface Role {
  _id: string;
  name: string;
  description: string;
}

interface Session {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  token: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  session: Session | null = null;
  rolename: string | null = null;

  constructor() { }

  ngOnInit() {
    const sessionData = localStorage.getItem('sesion');
    if (sessionData) {
      this.session = JSON.parse(sessionData);
      this.rolename = this.session.role.name;
    } else {
      console.error('No hay datos');
    }
  }
}
