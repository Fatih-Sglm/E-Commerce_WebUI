import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutAdminComponent } from './layout.admin.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutAdminComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: LayoutAdminComponent }
  ]),
  ]
})
export class LayoutModule { }
