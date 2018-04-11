import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  moduleId: module.id,
  selector: 'app-avaliador',
  templateUrl: './avaliador.component.html',
  styleUrls: ['./avaliador.component.css']
})
export class AvaliadorComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {
    document.getElementById('timer').innerHTML = '20' + ":" + '00';
    //this.startTimer();
  }

  finalizarAvaliacao() {
    var self = this; // store here
    if ( 
      $('.question1 .answers input:checked').val() &&
      $('.question2 .answers input:checked').val() &&
      $('.question3 .answers input:checked').val() &&
      $('.question4 .answers input:checked').val() &&
      $('.question5 .answers input:checked').val() &&
      $('.question6 .answers input:checked').val() &&
      $('.question7 .answers input:checked').val() &&
      $('.question8 .answers input:checked').val() &&
      $('.question9 .answers input:checked').val()
    ) {
      $('.step-question9').addClass('checked');
      $('.step-question9').removeClass('current');

      $('#header-avaliacao').fadeOut('slow');
      $('#quiz').fadeOut('slow', function(){
        $('#results').fadeIn('slow');
        self.showResults();
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
  }

  showResults() {
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
        type_question: "true_or_false",
        question: "10. Pensar na acessibilidade do seu site...",
        correctAnswer: "f,v,v,f,f,v,f,f,v,v"
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
      console.log(parseFloat(((parseFloat(countMatched) / parseFloat(multipleChoiseCorrectAnswer.length) ) * 10).toFixed(2)));
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

    
    // JR.
    totalPercentage = totalPercentage.toFixed(2);
    if ( totalPercentage <= 33 ) {
      resultsContainer.innerHTML = `
        <h1 class="text-center">Você obteve ${totalPercentage}% de acerto!</h1>
        <h2>Parabéns!</h2>
        <p>É sempre muito bom ver talentos emergentes! Você mal pode esperar pelas descobertas que fará ao aprofundar seus estudos e ganhar mais experiências com User Experience. De acordo com o seu teste, você está pronto para aplicar para vagas de UX Designer de nível <strong>Júnior</strong>.</p>
        <p>A faixa salarial na sua área, com a sua experiência, é de <strong>R$2370</strong> a <strong>R$4005</strong>.</p>
      `;
    }

    // PL.
    if ( totalPercentage > 33 && totalPercentage <= 70 ) {
      resultsContainer.innerHTML = `
        <h1 class="text-center">Você obteve ${totalPercentage}% de acerto!</h1>
        <h2>Parabéns!</h2>
        <p>User Experience é um campo relativamente novo, e mesmo assim você já entende bastante sobre a área. Continue pesquisando para fortalecer seus músculos de UX. Você está pronto para aplicar para vagas de UX Designer de nível <strong>Pleno</strong>. Parabéns!</p>
        <p>A faixa salarial na sua área, com a sua experiência, é de <strong>R$2370</strong> a <strong>R$4005</strong>.</p>
        `;
    }

    // SR;
    if ( totalPercentage > 70 ) {
      resultsContainer.innerHTML = `
        <h1 class="text-center">Você obteve ${totalPercentage}% de acerto!</h1>
        <h2>Parabéns!</h2>
        <p>Tem sido uma jornada e tanto! Você não só tem uma alta carga de conhecimentos técnicos, mas é capaz de ter reflexões complexas para criar experiências de impacto sobre um público alvo. Você está pronto para aplicar para vagas de UX Designer de nível <strong>Sênior</strong>. Parabéns!</p>
        <p>A faixa salarial na sua área, com a sua experiência, é de <strong>R$2370</strong> a <strong>R$4005</strong>.</p>
        `;
      }
    }


    /*
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
    }*/
}
