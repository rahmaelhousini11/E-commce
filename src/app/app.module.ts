import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { WishComponent } from './wish/wish.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductDetelisComponent } from './product-detelis/product-detelis.component';
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { SearchPipe } from './search.pipe';
import { CategrySliderComponent } from './categry-slider/categry-slider.component';
import { PayComponent } from './pay/pay.component';
import { AllordersComponent } from './allorders/allorders.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeartPipe } from './heart.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    ProductsComponent,
    CategoriesComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    WishComponent,
    ProductDetelisComponent,
    SearchPipe,
    CategrySliderComponent,
    PayComponent,
    AllordersComponent,
    HeartPipe
  ],
  imports: [
    BrowserModule,RouterModule,BrowserAnimationsModule,CarouselModule,
    FormsModule,
    AppRoutingModule ,ReactiveFormsModule ,HttpClientModule,
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    MatFormFieldModule,MatInputModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
