import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import  { AcoesDB } from "../services/acoesDB.service";
import  { ResultForm } from "../services/resultForm.service";

import * as $ from 'jquery';

@Component({
  moduleId: module.id,
  selector: 'app-avaliador',
  templateUrl: './avaliador.component.html',
  styleUrls: ['./avaliador.component.css']
})
export class AvaliadorComponent implements OnInit {
  
  user: Observable<firebase.User>;

  constructor( private router: Router, private acoesDB: AcoesDB, public afAuth: AngularFireAuth, private result: ResultForm ) {
    this.user = afAuth.authState;
  }
  ngOnInit() {
    document.getElementById('timer').innerHTML = '20' + ":" + '00';
    console.log(this.user.subscribe);
    $('html,body').animate({ scrollTop: 0 }, 'slow');
    this.startTimer();
  }

  getDate_beautyFormat() {
    let now;
    let year;
    let month;
    let day;
    let hour;
    let minute;
    let second;

    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  }

  enviarDados( p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, porcentagemfinal, nivelCalculado ) {
    let data = {
      'email': localStorage.getItem('fluxotextfire_mail'),
      'nome': localStorage.getItem('fluxotextfire_nome'),
      'nivel_suposto': localStorage.getItem('fluxotextfire_nivel'),
      'area_trabalho': localStorage.getItem('fluxotextfire_areatrabalho'),
      'date': this.getDate_beautyFormat(),
      respostas: {
        'pergunta1': p1,
        'pergunta2': p2,
        'pergunta3': p3,
        'pergunta4': p4,
        'pergunta5': p5,
        'pergunta6': p6,
        'pergunta7': p7,
        'pergunta8': p8,
        'pergunta9': p9,
        'pergunta10': p10,
      },
      resultado_final: {
        'porcentagem': porcentagemfinal,
        'nivel': nivelCalculado
      }
    };
  
    this.acoesDB.cadastraRespostas (data)
    .then(res => {
      console.log(res);
      this.router.navigate(['/resultado']);
    }, err => {
      console.log(err);
    });
  }

  finalizarAvaliacao() {
    var self = this; // store here
    
    //checkboxes
    var p8 = $( '.question7 input:checked' ).map(function() {
      return $(this).val();
    }).get();
    var p9 = $( '.question8 input:checked' ).map(function() {
      return $(this).val();
    }).get();
    var p10 = $( '.question9 input:checked' ).map(function() {
      return $(this).val();
    }).get();
    
    let p1 = $('.question0 .answers input:checked').val();
    let p2 = $('.question1 .answers input:checked').val();
    let p3 = $('.question2 .answers input:checked').val();
    let p4 = $('.question3 .answers input:checked').val();
    let p5 = $('.question4 .answers input:checked').val();
    let p6 = $('.question5 .answers input:checked').val();
    let p7 = $('.question6 .answers input:checked').val();

    if ( p1 && p2 && p3 && p4 && p5 && p6 && p7 && p8 && p9 && p10 ) {

      $('.step-question9').addClass('checked');
      $('.step-question9').removeClass('current');

      $('#header-avaliacao').fadeOut('slow');
      $('#quiz').fadeOut('slow', function(){
        $('#results').fadeIn('slow');
        self.showResults( p1, p2, p3, p4, p5, p6, p7, p8, p9, p10 );
      });

    } else {
      alert('Você tem perguntas que devem ser respondidas');
    }
  }

  proximaQuestao( n ) {
    $('.question-box').removeClass('active')
    $('.question'+n).addClass('active');

    $('.step').removeClass('current');
    $('.step-question'+n).addClass('current');
    if ( $('.question'+(n-1)+' .answers input:checked').val() ) {
      $( '.step-question'+(n-1) ).addClass('checked');
    }

    let converToNum = parseInt( $('.actual-question').html() );
    $('.actual-question').html( ( converToNum + 1).toString() );
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  }

  voltarQuestao( n ) {
    $('.question-box').removeClass('active');
    $('.question'+n).addClass('active');

    $('.step').removeClass('current');
    $('.step-question'+n).addClass('current');

    if ( $('.question'+(n-1)+' .answers input:checked').val() ) {
      $( '.step-question'+(n-1) ).addClass('checked');
    }

    let converToNum = parseInt( $('.actual-question').html() );
    $('.actual-question').html( ( converToNum - 1).toString() );
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  }

  showResults( p1, p2, p3, p4, p5, p6, p7, p8, p9, p10 ) {
    let answerContainers = document.getElementById("quiz").querySelectorAll(".answers");
    let totalPercentage : any = 0;
    let avaliacaoStep = document.getElementById("avaliacao-step");
    let myQuestions = [
      {
        type_question: "standard",
        question: "1.  Precisamos cons...",
        correctAnswer: "a"
      },
      {
        type_question: "standard_image",
        question: "2. Observe ...",
        correctAnswer: "d"
      },
      {
        type_question: "standard_image",
        question: "3. Vamos supor que você esteja entre...",
        correctAnswer: "c"
      },
      {
        type_question: "standard_image",
        question: "4. Uma das metodologias mais aplicadas para acelerar as chance...",
        correctAnswer: "b"
      },
      {
        type_question: "standard_image",
        question: "5. Observando a imagem ao lado, em qual das etapas do...",
        correctAnswer: "a"
      },
      {
        type_question: "standard_image",
        question: "6. A imagem apresentada é uma ferramen... ",
        correctAnswer: "c"
      },
      {
        type_question: "standard",
        question: "7. O mapa de empatia, é uma ferramenta pa...",
        correctAnswer: "b"
      },
      {
        type_question: "true_or_false",
        question: "8.  Há duas maneiras de se conduzir pesquisas com usuário...",
        correctAnswer: "f,t,f,t,t,f,t"
      },
      {
        type_question: "multiple_choice",
        question: "9. Ao se elaborar todo o inventário de...",
        correctAnswer: "b,d,e"
      },
      {
        type_question: "multiple_choice",
        question: "10. Pensar na acessibilidade do seu site...",
        correctAnswer: "b,c,f,i,j"
      }
    ];
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {

      if ( currentQuestion.type_question == 'multiple_choice' ) {
        let multipleChoiseCorrectAnswer;
        multipleChoiseCorrectAnswer = (currentQuestion.correctAnswer).split(',');

        const selector = `input[name=question${questionNumber}]:checked`;
      let multipleChoiseAnswered = $(selector).map( function() {
        return $(this).val();
      }).get();

      let length = Math.min( multipleChoiseCorrectAnswer.length, multipleChoiseAnswered.length );
      let countMatched : any = 0
      let countNotMatched : any = 0;

      for ( let index = 0; index < length; index++ ) {
        if ( multipleChoiseCorrectAnswer[index] == multipleChoiseAnswered[index] )
          countMatched++;
      }

      // calc % of multiple choice
      totalPercentage = parseFloat(totalPercentage) + parseFloat(((parseFloat(countMatched) / parseFloat(multipleChoiseCorrectAnswer.length) ) * 10).toFixed(2));


      } else if ( currentQuestion.type_question == 'true_or_false' ) {
        let multipleChoiseCorrectAnswer;
        multipleChoiseCorrectAnswer = (currentQuestion.correctAnswer).split(',');

        const selector = `.true-or-false input:checked`;
        let multipleChoiseAnswered = $(selector).map( function() {
          return $(this).val();
        }).get();
        let length = Math.min( multipleChoiseCorrectAnswer.length, multipleChoiseAnswered.length );
        let countMatched : any = 0
        let countNotMatched : any = 0;

        for ( let index = 0; index < length; index++ ) {
          if ( multipleChoiseCorrectAnswer[index] == multipleChoiseAnswered[index] )
            countMatched++;
        }

        // calc % of multiple choice
        totalPercentage = parseFloat(totalPercentage) + parseFloat(((parseFloat(countMatched) / parseFloat(multipleChoiseCorrectAnswer.length) ) * 10).toFixed(2));
      } else {
        // find selected answer
        let answerContainer = answerContainers[questionNumber];
        let selector = `input[name=question${questionNumber}]:checked`;
        let userAnswer = ( <HTMLInputElement> answerContainer.querySelector(selector)).value;
          
          
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer)
            totalPercentage = parseFloat(totalPercentage) + 10;
      }
    });

    let nivelCalculado;
    
    // JR.
    totalPercentage = totalPercentage.toFixed(2);
    if ( totalPercentage <= 40 ) {
      nivelCalculado = 'Júnior';
      localStorage.setItem('fluxotextfire_nivelresult', 'jr');
    }

    // PL.
    if ( totalPercentage > 40 && totalPercentage <= 89 ) {
      nivelCalculado = 'Pleno';
      localStorage.setItem('fluxotextfire_nivelresult', 'pl');
    }

    // SR;
    if ( totalPercentage > 89 ) {
      nivelCalculado = 'Sênior';
      localStorage.setItem('fluxotextfire_nivelresult', 'sr');
    }

    localStorage.setItem('fluxotextfire_nivelpercent', totalPercentage);

    // ENVIA DADOS PARA O FIREBASE
    this.enviarDados( p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, totalPercentage, nivelCalculado );
    }
    
    startTimer() {
      var timeInMinutes = 20;
      var currentTime = new Date().getTime();
      var currentTimePlus20 = new Date(currentTime + timeInMinutes*60*1000).getTime();

      var x = setInterval(function() {

      var now = new Date().getTime();
      var deadline  = new Date(currentTimePlus20 - now).getTime();

        var m = Math.floor((deadline % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((deadline % (1000 * 60)) / 1000);
        
      document.getElementById('timer').innerHTML = m + ":" + s;
      if(m==0 && s==0){
        alert("Seu tempo acabou!");
        clearTimeout(x);}
      }, 1000);
    }
    

}
