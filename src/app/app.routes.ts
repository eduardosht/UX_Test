import { RouterModule, Routes } from '@angular/router';
import { AvaliadorComponent } from './avaliador/avaliador.component';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';

const appRoutes : Routes = [
    { path: 'avaliacao', component: AvaliadorComponent },
    { path: 'instrucoes', component: InstrucoesComponent },
    { path: '', component: CadastroLoginComponent }
];


export const routing = RouterModule.forRoot( appRoutes );