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
  @Input() area: string;
  @Input() nivel: string;
  meuForm: FormGroup;
  mensagem: string

  constructor(private router: Router ,private loginService: LoginService,fb: FormBuilder) {
    this.meuForm = fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required],
      area: ['', Validators.required],
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
      form.senha2)
    .then(res => {
      localStorage.setItem('fluxotextfire_nivel', form.nivel);
      localStorage.setItem('fluxotextfire_areatrabalho', form.area );
      localStorage.setItem('fluxotextfire_nome', form.nome);
      this.router.navigate(['/login']);
      // this.mensagem = "Cadastro";
    }, err => {
      console.log(err);
    if(err.message.valueOf() === "The email address is badly formatted."){this.mensagem = "Email inválido";}
    if(err.message.valueOf() === "The email address is already in use by another account."){this.mensagem = "O email inserido já está em uso."}
    if(err.message.valueOf() === "Password should be at least 6 characters"){this.mensagem = "Sua senha deve ter pelo menos 6 caracteres."}
    document.querySelector('#scroller').scrollIntoView();

      console.log(this.mensagem);
    });
  }
  possuiConta() {
    this.router.navigate(['/login']);
  }

}
