import { Component,OnInit } from '@angular/core';
import { LoginService } from "../services/login.service";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

    user: Observable<firebase.User>;
    firebase;

   mensagem: string;
  constructor(private loginService: LoginService,public afAuth: AngularFireAuth) { 
     this.user = afAuth.authState;
  
  }

  ngOnInit() {
    this.mensagem = '';
  }

   fazerLogin(email, password) {
    this.loginService.login(email, password)
    .then(res => {
      console.log(res);
    }, err => {
      console.log(err);
      this.mensagem = err;
    });
  }

  


}
