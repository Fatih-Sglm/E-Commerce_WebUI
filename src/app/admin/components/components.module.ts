import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule , DashboardModule , LoginModule
  ],
  exports:[
    DashboardModule, LoginModule
  ]
})
export class ComponentsModule { }
