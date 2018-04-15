import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import  { AcoesDB } from "../services/acoesDB.service";
import  { ResultForm } from "../services/resultForm.service";


import * as $ from 'jquery';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {
 
  constructor( private aval: ResultForm, private acoesDB: AcoesDB, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    let resultsTest = this.aval.getResults( localStorage.getItem('fluxotextfire_nivelresult') );
 
    $('#percentage').html( localStorage.getItem('fluxotextfire_nivelpercent') );
    $('#message_result').html( resultsTest.msge );
    $('#image_result').html(`
      <img id="img_nivel" src="./assets/images/grafico-${localStorage.getItem('fluxotextfire_nivelresult')}.png" alt="Gráfico representando sua posição como nível ${resultsTest.nivel}" title="Gráfico representando sua posição como nível ${resultsTest.nivel}" style="max-width: 90%;margin: 0 auto;display: block;">
      <p class="legend-image text-center">${resultsTest.salario}</p>
    `);
  }

  enviaComentario() {
    let data = {
      email: localStorage.getItem('fluxotextfire_mail'),
      'comentario': $('#comentario-txt').val()
    };
  
    this.acoesDB.enviaComentario(data)
    .then(res => {
      console.log(res);
      $('#comentario').html('<h1>Obrigado pelo seu comentário!</h1>');
    }, err => {
      console.log(err);
    });
  }
  
}
