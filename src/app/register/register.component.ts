import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

declare let $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  //variable
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
    });
    this.isLoadingScreen=true;

  }

  // registerForm and validation
  registerForm: FormGroup= new FormGroup({
    name:new FormControl(null ,[Validators.required,Validators.minLength(3)]),  // name:new FormControl("ahmed"), defaultvalue 
    email:new FormControl(null ,[Validators.required ,Validators.email]),
    password:new FormControl(null ,[Validators.required, Validators.pattern(/^([A-Za-z].{6,9})?[0-9]/)]),
    rePassword:new FormControl(null ,[Validators.required, Validators.pattern(/^([A-Za-z].{6,9})?[0-9]/)]),
    phone:new FormControl(null ,[Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)])
  } ,this.matchedPassword)

//callRegisterApi
  RegisterSubmitMethod(){
    this.isLoading=true;
    this.isLoadingScreen=true;
    this._AuthService.registerAPI(this.registerForm.value).subscribe({
    next: (res)=>{
      this.isLoadingScreen=false;
    console.log(res);
    this.isLoading=false;
    
    //programming routing
    this._Router.navigate(['/login'])
  },

  error: (err)=>{
    this.errorMessage =err.error.message;
    this.isLoading=false;
  },
})
    console.log(this.registerForm);
    
  }
//matchedPassword validation
  matchedPassword(g:any){
    if(g.get("password")?.value == g.get("rePassword")?.value){
      return null;
    }
    else{
      return {"matchedPassword":true}
    }
  }
}
