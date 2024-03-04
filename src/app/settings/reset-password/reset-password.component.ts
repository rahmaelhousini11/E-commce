import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

declare let $:any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errorMessage! :string;
  isLoading:boolean = false;
  isError:boolean=false;
  isLoadingScreen:boolean=false;
  
  constructor(private _AuthService:AuthService,private _Router:Router){}

  ngOnInit():void{

    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    });
    this.isLoadingScreen=true;

  }



  /////////// newPassForm ===3 form
  newPassForm: FormGroup= new FormGroup({
    email:new FormControl(null ,[Validators.required ,Validators.email]),
    newPassword:new FormControl(null ,[Validators.required, Validators.pattern(/^([A-Za-z].{6,9})?[0-9]/)]),
  });

  newPassSubmitMethod(){
    this.isLoadingScreen=true;
    this.isLoading=true;
    this._AuthService.newPassAPI(this.newPassForm.value).subscribe({
    next: (res)=>{
    this.isLoadingScreen=false;
    this.isLoading=false;
    this._Router.navigate(['/home']);
  },

  error: (err)=>{
    this.errorMessage =err.error.message;
    this.isLoading=false;
    this.isError=true
  },
}) 
  }

}
