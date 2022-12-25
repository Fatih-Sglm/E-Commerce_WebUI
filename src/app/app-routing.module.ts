import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutAdminComponent } from './admin/layout/layout.admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './ui/components/home/home.component';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
{path:"admin" , component:LayoutAdminComponent , canActivate:[AdminGuard] , children:[
  {path:"" , component: DashboardComponent , canActivate:[AdminGuard]},
  {path:"customers" , loadChildren: () => import("./admin/components/customers/customers.module").then(module => module.CustomersModule) , canActivate:[AdminGuard]},
  {path:"orders" , loadChildren: () => import("./admin/components/orders/orders.module").then(module => module.OrdersModule) , canActivate:[AdminGuard]},
  {path:"products" , loadChildren: () => import("./admin/components/products/products.module").then(module => module.ProductsModule) , canActivate:[AdminGuard]},
  
],},
{path:"login" , loadChildren: () => import("./admin/components/login/login.module").then(module => module.LoginModule)},
{path :"" , component:LayoutComponent , children:[
  {path:"" , component: HomeComponent},
  {path:"basket" , loadChildren: () => import("./ui/components/baskets/baskets.module").then(module => module.BasketsModule) , canActivate: [AuthGuard]},
  {path:"products" , loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule)},
]},

//{path:"login" , loadChildren: () => import("./ui/components/login/login.module").then(module => module.LoginModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
