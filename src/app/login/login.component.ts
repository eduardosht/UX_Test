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
    LoginComponent.createUsuario(LoginComponent.testa());
  }

   fazerLogin(email, password) {
    this.loginService.login(email, password)
    .then(res => {
      console.log(res);
    }, err => {
      console.log(err);
      this.mensagem = "Email e senha não encontrados no nosso sistema.";
    });
  }

  



static testa(){
  
var usuario1={
nome:"Joelzinho",
email:"andreytsuzuki@gmail.com",
senhoridade:"junior",
senha:"aiaiai"
}
var usuario2={
    nome:"Lizinha",
    email:"zinho@gmail.com",
    senhoridade:"senior",
    senha:"aiaiai"
}
var usuario3={
    nome:"Divinha",
    email:"gadual@gmail.com",
    senhoridade:"pleno",
    senha:"aiaiai"
}
var usuarios={
    usuario1,usuario2,usuario3

}
return usuarios;
}

static createUsuario(usuarios){
  console.log("Oiee");
    firebase.database().ref().child("cadastro").push(usuarios);

}

}
