import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  possuiConta() {
    $('input[type="password"]').fadeOut();
    $('.ja-possui').css('display', 'none');
    $('#form-name').html('Login');
    $('.criar-conta-btn').html('Realizar Teste')
  }

  criarConta() {
    let saveThis = this;
    $('#cadastro-form').submit(function(e) {
      e.preventDefault();
      saveThis.router.navigate(['/instrucoes']);
    });
  }
}
