import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { ResponsesComponent } from './responses/responses.component';

@NgModule({
  declarations: [
   
  ResponsesComponent,
],


  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
