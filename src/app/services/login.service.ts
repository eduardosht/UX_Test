import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class LoginService {

    user: Observable<firebase.User>;

    constructor( private router: Router, public afAuth: AngularFireAuth) {
        this.user = afAuth.authState;
    }


    login(mail: string, password: string) {
        return new Promise((resolve, reject) => {
          this.afAuth.auth.signInWithEmailAndPassword(mail, password)
          .then(res => {
            localStorage.setItem('fluxotextfire_mail', mail);
            this.router.navigate(['/instrucoes']);
          }, err =>reject(err))
        })
    }


    cadastrar( nome, email, password ) {
      return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {

          resolve(res);
        }, err => reject(err))
      })
    }


}