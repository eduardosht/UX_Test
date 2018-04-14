import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import { LoginService } from "../services/login.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {
  @Input() email: string;
  @Input() senha: string;
  @Input() nome: string;
  @Input() nivel: string;
  meuForm: FormGroup;
  mensagem: string

  constructor(private router: Router ,private loginService: LoginService,fb: FormBuilder) {
    this.meuForm = fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required],
      nivel: ['', Validators.required]
  });
}

ngOnInit() {
  this.mensagem = 'Preencha todos os campos';
}

  fazerCadastro( form ) {
    console.log(form);
    this.loginService.cadastrar (
      form.nome,
      form.email,
      form.senha,
      form.nivel)
    .then(res => {

      this.router.navigate(['/login']);
      // this.mensagem = "Cadastro";
    }, err => {
      console.log(err);
    
      this.mensagem = err.message;
      console.log(this.mensagem);
    });
  }
  possuiConta() {
    this.router.navigate(['/login']);
  }

  // criarConta() {
  //   let saveThis = this;
  //   $('#cadastro-form').submit(function(e) {
  //     e.preventDefault();
  //     saveThis.router.navigate(['/instrucoes']);
  //   });
  // }
}
