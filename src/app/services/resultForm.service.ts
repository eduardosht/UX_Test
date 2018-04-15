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
export class ResultForm {

    user: Observable<firebase.User>;
    constructor( private router: Router, public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
        this.user = afAuth.authState;
    }

    getResults( nivel ) {
        let dataReturn;
        let dataReturnParsed;

        if ( nivel == 'jr' ) {
            dataReturn = `{"nivel": "Júnior","msge": "É sempre muito bom ver talentos emergentes! Você mal pode esperar pelas descobertas que fará ao aprofundar seus estudos e ganhar mais experiências com User Experience. De acordo com o seu teste, você está pronto para aplicar para vagas de UX Designer de nível Júnior.","salario": "A faixa salarial na sua área, com a sua experiência, é de R$1895 a R$3204. (Fonte: SINE)"}`;
        }
        if ( nivel == 'pl' ) {
            dataReturn = `{"nivel": "Pleno","msge": "User Experience é um campo relativamente novo, e mesmo assim você já entende bastante sobre a área. Continue pesquisando para fortalecer seus músculos de UX. Você está pronto para aplicar para vagas de UX Designer de nível Pleno. Parabéns!","salario": "A faixa salarial na sua área, com a sua experiência, é de R$2370 a R$4005. (Fonte: SINE)"}  `;       
        }
        if ( nivel == 'sr' ) {
            dataReturn = `{"nivel": "Senior","msge": "Tem sido uma jornada e tanto! Você não só tem uma alta carga de conhecimentos técnicos, mas é capaz de ter reflexões complexas para criar experiências de impacto sobre um público alvo. Você está pronto para aplicar para vagas de UX Designer de nível Sênior. Parabéns!","salario": "A faixa salarial na sua área, com a sua experiência, é de R$2962 a R$5006. (Fonte: SINE)"}`;
        }

        dataReturnParsed = JSON.parse(dataReturn);
        return dataReturnParsed;
    }

}