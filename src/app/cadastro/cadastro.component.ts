import { Component, OnInit,Input } from '@angular/core';
import { LoginService } from "../services/login.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent  implements OnInit {
  @Input() email: string;
  @Input() senha: string;
  @Input() nome: string;
  @Input() senhoridade: string;
  meuForm: FormGroup;
  mensagem: string;
  
  constructor(private router: Router, private loginService: LoginService, fb: FormBuilder) { 

    this.meuForm = fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
      email: ['', Validators.required],
      senhoridade: ['', Validators.required]
  });

  }

  ngOnInit() {
    this.mensagem = '';
  }

  fazerCadastro( form ) {
    console.log(form);
    this.loginService.cadastrar (
      form.nome,
      form.email,
      form.senha,
      form.senhoridade)
    .then(res => {
      console.log(res);
      this.router.navigate(['/login']);
      // this.mensagem = "Cadastro";
    }, err => {
      console.log(err);
      this.mensagem = "Você deixou algum campo em branco.";
    });
  }
}
