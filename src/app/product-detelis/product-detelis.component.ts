import { Product, cartProduct } from './../product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';

// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { WishListService } from '../wish-list.service';

declare let $:any;

@Component({
  selector: 'app-product-detelis',
  templateUrl: './product-detelis.component.html',
  styleUrls: ['./product-detelis.component.css']
})
export class ProductDetelisComponent implements OnInit {

  pID!:string;
  productDetelis!: Product;
  productImages! :string[];
  isLoadingScreen:boolean=false;
  allProductItems:cartProduct[]=[];

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
    },
    nav: true
  }

  constructor(private _WishListService:WishListService,private toastEvokeService: ToastEvokeService,private _CartService:CartService,private _ActivatedRoute:ActivatedRoute ,private _ProductsService:ProductsService){}
  ngOnInit():void
  {
    
    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    });
    this.isLoadingScreen=true;

    this._ActivatedRoute.params.subscribe((par)=>{
      this.pID = par['id'];
      this._ProductsService.getSpecificProductAPI(this.pID).subscribe({
        next: (res)=>{
          this.isLoadingScreen=false;
          this.productDetelis= res.data;
          this.productImages =res.data.images;
        },
        error: (err)=>{console.log(err)}
      })
    })

  }

  addCartBtn(pId:string|null|undefined){
    // alert(pId);
    this.isLoadingScreen=true;
    this._CartService.addProductToCartAPI(pId).subscribe({
      next:(res)=>{
        this.isLoadingScreen=false;
        this.allProductItems = res.data.products;
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

  addToWishList(pId:any){
    this.isLoadingScreen=true;
    this._WishListService.addToWishList(pId).subscribe({
      next:(res)=>{
        this.isLoadingScreen=false;
        this.allProductItems = res.data.products;
        $(".icon button i").click(function(){
          $(".icon button i").css('color','red')
        })
        console.log(res);
        this.toastEvokeService.success(res.status,res.message).subscribe();
      },
      error:(err)=>{
        this.toastEvokeService.danger(err.status, err.message).subscribe();
      }
    })

  }

}
