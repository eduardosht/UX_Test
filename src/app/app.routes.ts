import { RouterModule, Routes } from '@angular/router';
import { AvaliadorComponent } from './avaliador/avaliador.component';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthGuard } from "./guards/auth.guard";

const appRoutes : Routes = [
    { path: 'avaliacao', component: AvaliadorComponent, canActivate: [AuthGuard] },
    { path: 'instrucoes', component: InstrucoesComponent,canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent,  },
    { path: 'cadastro', component: CadastroComponent,},
    { path: '', component: AvaliadorComponent, canActivate: [AuthGuard]}
];


export const routing = RouterModule.forRoot( appRoutes );