import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { CardComponent } from './components/card/card.component';
import { RxcompComponent } from './components/rxcomp/rxcomp.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InfoComponent } from './components/info/info.component';
import { AboutComponent } from './components/about/about.component';
import { AboutGuard }   from './components/about/about.guard';
import {ExitAboutGuard} from './components/about/exit.about.guard';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    CardComponent,
    RxcompComponent,
    DashboardComponent,
    InfoComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AboutGuard, ExitAboutGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
