import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

declare let $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  ///////variables////////
  errorMessage! :string;
  isLoading:boolean = false;
  isLoadingScreen:boolean=false;


  constructor(private _AuthService:AuthService ,private _Router:Router){}
  ngOnInit():void{

    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    })
    this.isLoadingScreen =true;
  }
  
  ///////////loginForm
  loginForm: FormGroup= new FormGroup({
    email:new FormControl(null ,[Validators.required ,Validators.email]),
    password:new FormControl(null ,[Validators.required, Validators.pattern(/^([A-Za-z].{6,9})?[0-9]/)]),
  });



    
//======== loginSubmitMethod ============
  loginSubmitMethod(){
    this.isLoading=true;
    this._AuthService.LoginAPI(this.loginForm.value).subscribe({
    next: (res)=>{
    this.isLoading=false;
    this.isLoadingScreen =false;

    if( res.message == "success"){

      // localStorage
      localStorage.setItem("userToken", res.token);
      this._AuthService.SaveTokenMethod();
      //home
      this._Router.navigate(['/home']);
    
    }
  },

  error: (err)=>{
    this.errorMessage =err.error.message;
    this.isLoading=false;
  },
}) 
  }


//   //======== forgetSubmitMethod ============
//   resetCodeSubmitMethod(){
//     this.isLoading=true;

//     this._AuthService.restCodeAPI(this.verifyPassForm.value).subscribe({
//     next: (res)=>{
//     this.isLoading=false;
//     if( res.status =="Success"){

//       //hide ==> verifyForm , show ==> newPassForm
//       this.verifyFlag=false;
//       this.newPassFlag=true;
//     }
//   },

//   error: (err)=>{
//     this.errorMessage =err.error.message;
//     this.isLoading=false;
//   },
// }) 
//   }
  
}
