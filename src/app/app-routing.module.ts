import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {MainWebsiteComponent} from "./components/main-website/main-website.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";

const routes: Routes = [
  {path: 'register', component: RegistrationFormComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'home', component: MainWebsiteComponent},
  {path: '', redirectTo: '/home', pathMatch:"full"},
  {path: '**', redirectTo: '/home', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
