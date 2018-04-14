import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import  { AcoesDB } from "../services/acoesDB.service";

import * as $ from 'jquery';

@Component({
  moduleId: module.id,
  selector: 'app-avaliador',
  templateUrl: './avaliador.component.html',
  styleUrls: ['./avaliador.component.css']
})
export class AvaliadorComponent implements OnInit {
  
  user: Observable<firebase.User>;

  constructor( private router: Router, private acoesDB: AcoesDB, public afAuth: AngularFireAuth ) {
    this.user = afAuth.authState;
  }
  ngOnInit() {
    document.getElementById('timer').innerHTML = '20' + ":" + '00';
    console.log(this.user.subscribe);
    //this.startTimer();
  }
  enviarDados( p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, porcentagemfinal, nivelCalculado ) {
    let data = {
      email: localStorage.getItem('fluxotextfire_mail'),
      nivel_suposto: localStorage.getItem('fluxotextfire_nivel'),
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
    let resultsContainer = document.getElementById("results");
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
      resultsContainer.innerHTML = `
        <h1>Você acertou ${totalPercentage}%</h1>
        <h2>Parabéns!</h2>
        <p>É sempre muito bom ver talentos emergentes! Você mal pode esperar pelas descobertas que fará ao aprofundar seus estudos e ganhar mais experiências com User Experience. De acordo com o seu teste, você está pronto para aplicar para vagas de UX Designer de nível <strong>Júnior</strong>.</p>
        <img src="./assets/images/grafico-jr.png" alt="Gráfico representando sua posição como nível Júnior" title="Gráfico representando sua posição como nível Júnior">
        <p class="legend-image">A faixa salarial na sua área, com a sua experiência, é de R$1895 a R$3204. (Fonte: SINE)</p>

        <style>
          #results h1 {
            font-size: 24px;
            line-height: 28px;
            margin: 40px 0 30px 0;
          }
          #results h2 {
            font-size: 22px;
            font-weight: bold;
          }
          #results p {
            font-size: 16px !important;
          }
          #results img {
            width: 550px;
            margin: 30px auto;
            display: block;
            max-width: 90%; 
          }
        </style>
      `;
    }

    // PL.
    if ( totalPercentage > 40 && totalPercentage <= 89 ) {
      nivelCalculado = 'Pleno';
      resultsContainer.innerHTML = `
      <h1>Você acertou ${totalPercentage}%</h1>
        <h2>Parabéns!</h2>
        <p>User Experience é um campo relativamente novo, e mesmo assim você já entende bastante sobre a área. Continue pesquisando para fortalecer seus músculos de UX. Você está pronto para aplicar para vagas de UX Designer de nível <strong>Pleno</strong>. Parabéns!</p>
        <img src="./assets/images/grafico-pl.png" alt="Gráfico representando sua posição como nível Pleno" title="Gráfico representando sua posição como nível Pleno">
        <p class="legend-image">A faixa salarial na sua área, com a sua experiência, é de R$2370 a R$4005. (Fonte: SINE)</p>

        <style>
          #results h1 {
            font-size: 24px;
            line-height: 28px;
            margin: 40px 0 30px 0;
          }
          #results h2 {
            font-size: 22px;
            font-weight: bold;
          }
          #results p {
            font-size: 16px !important;
          }
          #results img {
            width: 550px;
            margin: 30px auto;
            display: block;
            max-width: 90%; 
          }
        </style>
        `;
    }

    // SR;
    if ( totalPercentage > 89 ) {
      nivelCalculado = 'Senior';
      resultsContainer.innerHTML = `
      <h1>Você acertou ${totalPercentage}%</h1>
        <h2>Parabéns!</h2>
        <p>Tem sido uma jornada e tanto! Você não só tem uma alta carga de conhecimentos técnicos, mas é capaz de ter reflexões complexas para criar experiências de impacto sobre um público alvo. Você está pronto para aplicar para vagas de UX Designer de nível <strong>Sênior</strong>. Parabéns!</p>
        <img src="./assets/images/grafico-sr.png" alt="Gráfico representando sua posição como nível Sênior" title="Gráfico representando sua posição como nível Sênior">
        <p class="legend-image">A faixa salarial na sua área, com a sua experiência, é de R$2962 a R$5006. (Fonte: SINE)</p>

        <style>
          #results h1 {
            font-size: 24px;
            line-height: 28px;
            margin: 40px 0 30px 0;
          }
          #results h2 {
            font-size: 22px;
            font-weight: bold;
          }
          #results p {
            font-size: 16px !important;
          }
          #results img {
            width: 550px;
            margin: 30px auto;
            display: block;
            max-width: 90%; 
          }
        </style>
        `;
      }

      // ENVIA DADOS PARA O FIREBASE
      this.enviarDados( p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, totalPercentage, nivelCalculado );
    }


    
    startTimer() {
      let presentTime = document.getElementById('timer').innerHTML;
      let timeArray = presentTime.split(/[:]+/);
      let m = parseFloat( timeArray[0] );
      let s = this.checkSecond(( parseFloat( timeArray[1] ) - 1));
      
      if(s==59){m=m-1}
      //if(m<0){alert('timer completed')}
      
      document.getElementById('timer').innerHTML = m + ":" + s;
      setTimeout(this.startTimer(), 1000);
    }
    
    checkSecond(sec) {
      if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
      if (sec < 0) {sec = "59"};
      return sec;
    }
}
