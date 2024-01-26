import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MainWebsiteComponent } from './components/main-website/main-website.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    NavbarComponent,
    TasksComponent,
    MainWebsiteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
