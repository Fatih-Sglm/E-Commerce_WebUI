import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './layout/layout.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule  , ComponentsModule  ,LayoutModule
  ],
  exports:[
    CommonModule  , ComponentsModule , LayoutModule 
  ]
})
export class UiModule { }
