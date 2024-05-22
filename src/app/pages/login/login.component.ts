import { Token } from '@angular/compiler';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { User } from 'src/app/models/funeraria/user.model';
import { SecurityService } from 'src/app/services/funeraria/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  theUser: User;
  mode : number; // 0: first log, 1: second autehntication
  token: string;
  constructor(private service: SecurityService,
              private router: Router) {
    this.mode=0;
    this.theUser = {
      email: "",
      password: "",
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login() {
    console.log(this.theUser);
    this.service.login(this.theUser).subscribe({
      next: (data) => {
        this.theUser._id = data["id"];
        this.mode = 1;
      },
      error: (error) => {
        console.log("Error" + JSON.stringify(error));
        Swal.fire(
          "Autenticación invalida",
          "Usuario o contraseña incorrectos",
          "error");
      }
    });
  }

  secondAuth() {
    this.service.secondAuth(this.theUser._id, this.token).subscribe({
      next: (data) => {
        this.service.saveSession(data);
        this.service.activeUserSession;
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        console.log("Error" + JSON.stringify(error));
        Swal.fire(
          "Autenticación invalida",
          "Token incorrecto",
          "error");
      }
    });
  }

}
