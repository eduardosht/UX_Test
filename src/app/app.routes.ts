import { RouterModule, Routes } from '@angular/router';
import { AvaliadorComponent } from './avaliador/avaliador.component';
import { InstrucoesComponent } from './instrucoes/instrucoes.component';

const appRoutes : Routes = [
    { path: 'avaliacao', component: AvaliadorComponent },
    { path: 'instrucoes', component: InstrucoesComponent },
    { path: '', component: InstrucoesComponent }
];


export const routing = RouterModule.forRoot( appRoutes );