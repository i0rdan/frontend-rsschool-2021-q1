import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CardComponent } from './components/card/card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FieldComponent } from './components/field/field.component';
import { AboutGuard }   from './components/about/about.guard';
import {ExitAboutGuard} from './components/about/exit.about.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'game', component: FieldComponent },
  { path: 'info', component: AboutComponent },
  //lazy { path: 'info', loadChildren: () => import('./components/info/info.module').then(m => m.InfoModule)},
  { path: 'about', component: AboutComponent, canActivate: [AboutGuard], canDeactivate: [ExitAboutGuard]},
  { path: 'dashboard', component: DashboardComponent,},
  { path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'info', component: FieldComponent },
    { path: 'about', component: AboutComponent },
    ]
  },
  { path: 'card/:id', component: CardComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
