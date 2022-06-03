import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { EmployeesComponent } from './employees/employees.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MynameComponent } from './myname/myname.component';
import { PrintnameComponent } from './printname/printname.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoDetailsComponent,
    EmployeesComponent,
    LoginComponent,
    SignupComponent,
    UpdateUserComponent,
    MynameComponent,
    PrintnameComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
