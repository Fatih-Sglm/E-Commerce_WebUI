import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
    ],
    exports: [
        
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: "", component: LayoutComponent }
        ]),
    ]
})
export class LayoutModule { }
