import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    ForgetPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
