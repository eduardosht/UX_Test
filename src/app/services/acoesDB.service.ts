import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AcoesDB {

    user: Observable<firebase.User>;

    constructor( private router: Router, public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
        this.user = afAuth.authState;
    }

    cadastraRespostas( obj ) {
        console.log(this.af);
        console.log(obj);
      return new Promise<any>((resolve, reject) => {
        this.af.database.ref('data').push(obj)
        .then(res => {
          resolve(res);
        }, err => reject(err))
      })
    }


}