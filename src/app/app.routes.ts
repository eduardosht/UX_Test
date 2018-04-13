import { RouterModule, Routes } from '@angular/router';
import { AvaliadorComponent } from './avaliador/avaliador.component';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { LoginComponent } from './login/login.component';


const appRoutes : Routes = [
    { path: 'avaliacao', component: AvaliadorComponent },
    { path: 'instrucoes', component: InstrucoesComponent },
    { path: 'login', component: LoginComponent,  },
    { path: 'cadastro', component: CadastroLoginComponent,},
    { path: '', component: CadastroLoginComponent }
];


export const routing = RouterModule.forRoot( appRoutes );