import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

declare let $:any;

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {

  isLoading:boolean = false;
  errorMessage:string="";
  isError:boolean=false;
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

  ///////////verifyPassForm ===2 form
  verifyPassForm: FormGroup= new FormGroup({
      resetCode:new FormControl(null),
  });
    
  //======== forgetSubmitMethod ============
  resetCodeSubmitMethod(){
    this.isLoading=true;
    this.isLoadingScreen=true;
    this._AuthService.restCodeAPI(this.verifyPassForm.value).subscribe({
    next: (res)=>{
    
      this._Router.navigate(['/settings','resetPassword'])
    this.isLoading=false;
    this.isLoadingScreen=false;
  },

  error: (err)=>{
    this.errorMessage =err.error.message;
    this.isLoading=false;
    this.isLoadingScreen=false;
    this.isError=true
  },
}) 
  }

}
