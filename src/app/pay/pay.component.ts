import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';


declare let $:any;


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit{

  cartId:string ="";
  isLoadingScreen:boolean=false;

  constructor(private _OrdersService:OrdersService ,private _ActivatedRoute:ActivatedRoute){}


  
  addressForm :FormGroup = new FormGroup({
    details:new FormControl(null ,[Validators.required ,Validators.minLength(3)]),
    phone:new FormControl(null ,[Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    city:new FormControl(null ,[Validators.required]),
  });


  ngOnInit():void{

    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    })
    this.isLoadingScreen =true;

    this._ActivatedRoute.params.subscribe( (p)=>{
     this.cartId= p['id'];
     console.log(this.cartId);
     
    })

  }

  addressFormSubmit(){
    this.isLoadingScreen =true;
    // console.log(this.addressForm.value);
    this._OrdersService.checkOutAPI(this.cartId ,this.addressForm.value).subscribe({
      next:(res)=>{
        
        console.log(res);
        
        this.isLoadingScreen =false
        window.location.href =res.session.url;
        console.log(res.session.url);
      },
      error:(err)=>{console.log(err);
      }
    })
    

  }

}
