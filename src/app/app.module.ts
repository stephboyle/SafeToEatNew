import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WebService } from './web.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationPageModule } from './registration/registration.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageModule } from './login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, RegistrationPageModule, HttpClientModule, LoginPageModule  ],
  providers: [WebService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
