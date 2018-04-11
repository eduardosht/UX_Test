import { RouterModule, Routes } from '@angular/router';
import { AvaliadorComponent } from './avaliador/avaliador.component';

const appRoutes : Routes = [
    { path: 'avaliacao', component: AvaliadorComponent },
    { path: '', component: AvaliadorComponent }
];


export const routing = RouterModule.forRoot( appRoutes );