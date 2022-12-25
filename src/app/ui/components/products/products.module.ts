import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatOption } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    declarations: [
        ListProductComponent,
        ProductsComponent,
        ProductDetailComponent,
        CategoriesComponent,
        CategoriesComponent,
    ],
    imports: [
        CommonModule,MatSelectModule,
        RouterModule.forChild([
            { path: "", component: ProductsComponent }
        ]),
        RouterModule.forChild([
            { path: ":id", component: ProductDetailComponent }
        ]),
    ]
})
export class ProductsModule { }
