import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {path:"" ,redirectTo:"forgetPassword" ,pathMatch:'full'},
  {path:"forgetPassword",component:ForgetPasswordComponent},
  {path:"verifyCode",component:VerifyCodeComponent},
  {path:"resetPassword",component:ResetPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
