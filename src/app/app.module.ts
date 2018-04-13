import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { routing } from './app.routes';
import { AvaliadorComponent } from './avaliador/avaliador.component';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';
import { MenuComponent } from './menu/menu.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from "./services/login.service";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const firebaseConfig = {
  apiKey: "AIzaSyD8v6JZuM_IcL___u9uiGFWF_fiHTYx7lk",
    authDomain: "assignment-3-7199a.firebaseapp.com",
    databaseURL: "https://assignment-3-7199a.firebaseio.com",
    projectId: "assignment-3-7199a",
    storageBucket: "",
    messagingSenderId: "869766437413"
};

@NgModule({
  declarations: [
    AppComponent,
    AvaliadorComponent,
    InstrucoesComponent,
    MenuComponent,
    CadastroLoginComponent,
    LoginComponent,
        
    
  ],
  imports: [
    BrowserModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
