import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

declare let $:any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})

export class ForgetPasswordComponent {

  isLoading:boolean = false;
  errorMessage!:string;
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

  ///////////forgetPassForm ===1 form
  // emailFormControl = new FormControl('');

  forgetPassForm: FormGroup= new FormGroup({
    email:new FormControl(null),
  });
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  forgetSubmitMethod(){
    // alert("hii");
        this.isLoading=true;
        this.isLoadingScreen=true;
        this._AuthService.forgetPassAPI(this.forgetPassForm.value).subscribe({
        next: (res)=>{
        // console.log(res.message);
        this.isLoading=false;
        this.isLoadingScreen=true;
      this._Router.navigate(['/settings','verifyCode']);
        
      },
      error: (err)=>{
        this.errorMessage =err.error.message;
        this.isLoading=false;
        this.isError=true
      },
    }) 
      }
  }

