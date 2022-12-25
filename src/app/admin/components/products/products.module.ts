import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,MatSelectModule,ReactiveFormsModule,NgxFileDropModule,
    RouterModule.forChild([
      { path: "addProduct", component: CreateProductComponent }
  ])
  ]
})
export class ProductsModule { }
