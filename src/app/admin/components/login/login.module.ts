import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule, MatButtonModule,
    RouterModule.forChild([
      { path: "", component: LoginComponent }
  ])
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
