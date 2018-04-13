import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";


@Injectable()
export class LoginService {

    user: Observable<firebase.User>;

    constructor(private router: Router, public afAuth: AngularFireAuth) {
        this.user = afAuth.authState;
    }


    login(mail: string, password: string) {
        return new Promise((resolve, reject) => {
          this.afAuth.auth.signInWithEmailAndPassword(mail, password)
          .then(res => {
            this.router.navigate(['']);
            console.log(res);
          }, err =>reject(err))
        })
    }


    cadastrar(nome, email, password, senhoridade){
      return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          LoginService.cadastraBD(nome, email, senhoridade)
          resolve(res);
        }, err => reject(err))
      })
    }


    public static cadastraBD(nomeInput, emailInput, senhoridadeInput){
    var usuario={
        nome:nomeInput,
        email:emailInput,
        senhoridade:senhoridadeInput
    } 
          firebase.database().ref().child("casdatra").push(usuario);
  }
}