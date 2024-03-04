import { CategoriesComponent } from './categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth.guard';
import { ProductDetelisComponent } from './product-detelis/product-detelis.component';
import { WishComponent } from './wish/wish.component';
import { PayComponent } from './pay/pay.component';
import { AllordersComponent } from './allorders/allorders.component';

const routes: Routes = [
  {path:"" , redirectTo:"register",pathMatch:"full"},
  {path:"home",canActivate:[authGuard] ,component:HomeComponent},
  {path:"brands" ,canActivate:[authGuard] ,component:BrandsComponent},
  {path:"products" ,canActivate:[authGuard] ,component:ProductsComponent},
  {path:"productDetelis/:id" ,canActivate:[authGuard] ,component:ProductDetelisComponent},
  {path:"categories" ,canActivate:[authGuard] ,component:CategoriesComponent},
  {path:"cart" ,canActivate:[authGuard] ,component:CartComponent},
  {path:"allorders",component:AllordersComponent},

  {path:"pay/:id" ,canActivate:[authGuard] ,component:PayComponent},
  {path:"register",component:RegisterComponent},
  {path:"login" ,component:LoginComponent},
  {path:"wishList",canActivate:[authGuard],component:WishComponent},
  {path:"settings" ,loadChildren:()=>import('./settings/settings.module').then((data)=>data.SettingsModule )},
  
  {path:"**" ,component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
