import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  moduleId: module.id,
  selector: 'app-avaliador',
  templateUrl: './avaliador.component.html',
  styleUrls: ['./avaliador.component.css']
})
export class AvaliadorComponent {

  constructor() {
    
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

      $('#avaliacao-step').fadeOut('slow');
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
  }

  voltarQuestao( n ) {
    $('.question-box').removeClass('active');
    $('.question'+n).addClass('active');

    $('.step').removeClass('current');
    $('.step-question'+n).addClass('current');

    if ( $('.question'+(n-1)+' .answers input:checked').val() ) {
      $( '.step-question'+(n-1) ).addClass('checked');
    }
  }

  showResults() {
    let answerContainers = document.getElementById("quiz").querySelectorAll(".answers");
    let totalPercentage : any = 0;
    let avaliacaoStep = document.getElementById("avaliacao-step");
    let resultsContainer = document.getElementById("results");
    let myQuestions = [
      {
        type_question: "standard",
        question: "Who is the strongest?",
        answers: {
          a: "Superman",
          b: "The Terminator",
          c: "Waluigi, obviously",
          d: "Waluigi, obviously",
          e: "Waluigi, obviously"
        },
        correctAnswer: "a"
      },
      {
        type_question: "standard_image",
        stand_img_url: "https://cdn.pixabay.com/photo/2016/10/23/06/04/google-1762248_960_720.png",
        question: "What is the best site ever created?",
        answers: {
          a: "SitePoint",
          b: "Simple Steps Code",
          c: "Trick question; they're both the best",
          d: "Trick question; they're both the best",
          e: "Trick question; they're both the best"
        },
        correctAnswer: "a"
      },
      {
        type_question: "multiple_choice",
        question: "Where is Waldo really?",
        answers: {
          a: "Antarctica",
          b: "Exploring the Pacific Ocean",
          c: "Sitting in a tree",
          d: "Minding his own business, so stop asking",
          e: "Minding his own business, so stop asking"
        },
        correctAnswer: "a,b"
      },
      {
        type_question: "standard",
        question: "Where is Waldo really?",
        answers: {
          a: "Antarctica",
          b: "Exploring the Pacific Ocean",
          c: "Sitting in a tree",
          d: "Minding his own business, so stop asking",
          e: "Minding his own business, so stop asking"
        },
        correctAnswer: "a"
      },
      {
        type_question: "multiple_choice",
        question: "Where is Waldo really?",
        answers: {
          a: "Antarctica",
          b: "Exploring the Pacific Ocean",
          c: "Sitting in a tree",
          d: "Minding his own business, so stop asking",
          e: "Minding his own business, so stop asking"
        },
        correctAnswer: "a,b,c"
      },
      {
        type_question: "standard_image",
        stand_img_url: "https://cdn.pixabay.com/photo/2016/10/23/06/04/google-1762248_960_720.png",
        question: "Where is Waldo really?",
        answers: {
          a: "Antarctica",
          b: "Exploring the Pacific Ocean",
          c: "Sitting in a tree",
          d: "Minding his own business, so stop asking",
          e: "Minding his own business, so stop asking"
        },
        correctAnswer: "a"
      },
      {
        type_question: "standard_image",
        stand_img_url: "https://cdn.pixabay.com/photo/2016/10/23/06/04/google-1762248_960_720.png",
        question: "What is the best site ever created?",
        answers: {
          a: "Antarctica",
          b: "Exploring the Pacific Ocean",
          c: "Sitting in a tree",
          d: "Minding his own business, so stop asking",
          e: "Minding his own business, so stop asking"
        },
        correctAnswer: "a"
      },
      {
        type_question: "standard_image",
        stand_img_url: "https://cdn.pixabay.com/photo/2016/10/23/06/04/google-1762248_960_720.png",
        question: "What is the best site ever created?",
        answers: {
          a: "Antarctica",
          b: "Exploring the Pacific Ocean",
          c: "Sitting in a tree",
          d: "Minding his own business, so stop asking",
          e: "Minding his own business, so stop asking"
        },
        correctAnswer: "d"
      },
      {
        type_question: "standard_image",
        stand_img_url: "https://cdn.pixabay.com/photo/2016/10/23/06/04/google-1762248_960_720.png",
        question: "What is the best site ever created?",
        answers: {
          a: "Antarctica",
          b: "Exploring the Pacific Ocean",
          c: "Sitting in a tree",
          d: "Minding his own business, so stop asking",
          e: "Minding his own business, so stop asking"
        },
        correctAnswer: "a"
      },
      {
        type_question: "standard",
        question: "What is the best site ever created?",
        answers: {
          a: "Antarctica",
          b: "Exploring the Pacific Ocean",
          c: "Sitting in a tree",
          d: "Minding his own business, so stop asking",
          e: "Minding his own business, so stop asking"
        },
        correctAnswer: "a"
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
    if ( totalPercentage <= 33 ) {
      resultsContainer.innerHTML = `
        <h1 class="text-center">Você obteve ${totalPercentage}% de acerto!</h1>
        <h2>Seu nível é Júnior.</h2>
        <p>É sempre muito bom ver talentos emergentes! Você mal pode esperar pelas descobertas que fará ao aprofundar seus estudos e ganhar mais experiências com User Experience. De acordo com o seu teste, você está pronto para aplicar para vagas de UX Designer de nível Júnior. Parabéns!</p>

        <div class="share-result">
          <h3>Compartilhe seu resultado</h3>
          <ul>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>
      `;
    }

    // PL.
    if ( totalPercentage > 33 && totalPercentage <= 70 ) {
      resultsContainer.innerHTML = `
        <h1 class="text-center">Você obteve ${totalPercentage}% de acerto!</h1>
        <h2>Seu nível é Pleno.</h2>
        <p>User Experience é um campo relativamente novo, e mesmo assim você já entende bastante sobre a área. Continue pesquisando para fortalecer seus músculos de UX. Você está pronto para aplicar para vagas de UX Designer de nível Pleno. Parabéns!</p>
      `;
    }

    // SR;
    if ( totalPercentage > 70 ) {
      resultsContainer.innerHTML = `
        <h1 class="text-center">Você obteve ${totalPercentage}% de acerto!</h1>
        <h2>Seu nível é Senior.</h2>
        <p>Tem sido uma jornada e tanto! Você não só tem uma alta carga de conhecimentos técnicos, mas é capaz de ter reflexões complexas para criar experiências de impacto sobre um público alvo. Você está pronto para aplicar para vagas de UX Designer de nível Sênior. Parabéns!</p>
      `;
      }
    }
}
