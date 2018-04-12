import { RouterModule, Routes } from '@angular/router';
import { AvaliadorComponent } from './avaliador/avaliador.component';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const appRoutes : Routes = [
    { path: 'avaliacao', component: AvaliadorComponent },
    { path: 'instrucoes', component: InstrucoesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: '', component: AvaliadorComponent }
];


export const routing = RouterModule.forRoot( appRoutes );