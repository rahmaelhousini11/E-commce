import { ProductsService } from '../products.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishListService } from '../wish-list.service';
import { CartService } from '../cart.service';


declare let $:any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  allProduct! :Product[];
  userWord:string="";
  isLoadingScreen:boolean=false;
  isAddFav:boolean=false;
  index:number=0;

  constructor(private _CartService:CartService,private _ProductsService:ProductsService, private _WishListService:WishListService,private toastEvokeService: ToastEvokeService){}

  ngOnInit(): void{

    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    });
     this.isLoadingScreen=true;
     this.isAddFav=true
    this._ProductsService.getProductAPI().subscribe({
      next: (res)=>{
        this.isLoadingScreen=false;
        this.allProduct= res.data;
        
      },
      error:(err)=>{console.log(err);
      }
    })
    localStorage.setItem("currentPage" ,"/products");

  }
  
  addCartBtn(pId:string){
    // alert(pId);
    this.isLoadingScreen=true;
    this._CartService.addProductToCartAPI(pId).subscribe({
      next:(res)=>{
        this.isLoadingScreen=false;
        // Type SUCCESS
        this._CartService.numOfCartItems.next(res.numOfCartItems);
        this.toastEvokeService.success('Success',res.message).subscribe();
      },

      error:(err)=>{
         // Type ERROR
         this.toastEvokeService.danger('Fail', err.message).subscribe();
      }

    })

  }

  addToWishList(pId:any ,i:any){
    this.isLoadingScreen=true;
    this._WishListService.addToWishList(pId).subscribe({
      next:(res)=>{
        this.isaddFav(i);
        this.isLoadingScreen=false;
        // console.log(res);
        this.toastEvokeService.success(res.status,res.message).subscribe();
      },
      error:(err)=>{
        this.toastEvokeService.danger(err.status, err.message).subscribe();
      }
    })

  }
  
  isaddFav(i:any){
    this.index = i;
    this.isAddFav = true;
  }


}
