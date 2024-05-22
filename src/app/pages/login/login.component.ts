import { Component, OnInit, OnDestroy } from '@angular/core';
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
  constructor(private service: SecurityService) {
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
    this.service.login(this.theUser).subscribe(data => {
      next: (data) => {
        console.log("Respuesta"+JSON.stringify(data));
      }
      error: (error) => {
        console.log("Error"+JSON.stringify(error));
        Swal.fire("Autenticación invalida",
          "Usuario o contraseña incorrectos",
          "error");
      }
    });
  }

}
