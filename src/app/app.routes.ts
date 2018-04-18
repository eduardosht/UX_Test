import { RouterModule, Routes } from '@angular/router';
import { AvaliadorComponent } from './avaliador/avaliador.component';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';
import { CadastroLoginComponent } from './cadastro-login/cadastro-login.component';
import { LoginComponent } from './login/login.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { AuthGuard } from './guard/auth.guard';
import { ModuleWithProviders } from "@angular/core/src/metadata";

export const APP_ROUTES: Routes = [
    { path: 'avaliacao', component: AvaliadorComponent,canActivate: [AuthGuard] },
    { path: 'instrucoes', component: InstrucoesComponent ,canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroLoginComponent },
    { path: 'resultado', component: ResultadoComponent ,canActivate: [AuthGuard]},
    { path: '', component: LoginComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);