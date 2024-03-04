import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishListService } from '../wish-list.service';



declare let $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  allProduct! :Product[];
  userWord:string="";
  categoryData! :Product[];
  isLoadingScreen:boolean=false;
  isAddFav:boolean=false;
  index:number=0;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor( private _WishListService:WishListService,private toastEvokeService: ToastEvokeService, private _ProductsService:ProductsService ,private _CartService:CartService ){}

  ngOnInit(): void{
    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    });
    this.isLoadingScreen =true;
    this.isAddFav=true;

    this._ProductsService.getProductAPI().subscribe({
      next: (res)=>{
        this.allProduct= res.data;

        this.isLoadingScreen=false
      
    },
      error:(err)=>{console.log(err);
      }
    })

    localStorage.setItem("currentPage" ,"/home");
  }

  addCartBtn(pId:string){
    // alert(pId);
    this.isLoadingScreen=true;
    this._CartService.addProductToCartAPI(pId).subscribe({
      next:(res)=>{
        // Type SUCCESS
        this.isLoadingScreen=false
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
        this.isLoadingScreen=false
        // console.log(res);
        
        this.toastEvokeService.success(res.status,res.message).subscribe();
      },
      error:(err)=>{
        this.toastEvokeService.danger(err.status, err.message).subscribe();
      }
    })

  }

  isaddFav(i:any){
    this.index=i;
    this.isAddFav=true;
  }

}
