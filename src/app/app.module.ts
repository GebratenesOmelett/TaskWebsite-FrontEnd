import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainWebsiteComponent } from './components/main-website/main-website.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {SuccededComponent} from "./components/alert/succeded/succeded.component";
import {FailedComponent} from "./components/alert/failed/failed.component";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    NavbarComponent,
    MainWebsiteComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        SuccededComponent,
        FailedComponent,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
