import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FieldComponent } from './components/field/field.component';
import { CardComponent } from './components/card/card.component';
import { RxcompComponent } from './components/rxcomp/rxcomp.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    CardComponent,
    RxcompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
