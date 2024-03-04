import { Product, cartProduct} from './../product';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { BehaviorSubject } from 'rxjs';


declare let $:any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit{
  allProductItems:cartProduct[]=[];
  cartId:string="";
  totalPrice!:string;
  numOfallItem:string="";
  totalItem:string="";

  isEmptyCart:any;
  isButton:any;
  istotalPrice:any;
  istotalItem:any;

  isLoadingScreen:boolean=false;

  constructor(private toastEvokeService: ToastEvokeService,private _CartService:CartService){}
////start
  ngOnInit(): void{
    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    })
    this.isLoadingScreen =true;
    this.isEmptyCart=true;
    localStorage.setItem("currentPage" ,"/cart");

    this._CartService.getAllCartAPI().subscribe({
      next:(res)=>{
        this.allProductItems = res.data.products;
        this.isLoadingScreen =false;
        this.isEmptyCart=false;
          // console.log(this.allProductItems);
        this.totalItem=res.numOfCartItems;
        this.totalPrice=res.data.totalCartPrice;
         this._CartService.numOfCartItems.next(res.numOfCartItems);
         this.cartId =res.data._id;
         this._CartService.isButton.subscribe( ()=>{
          this.isButton = this._CartService.isButton.getValue();
         } );

         this._CartService.isEmptyCart.subscribe( ()=>{
          this.isEmptyCart = this._CartService.isEmptyCart.getValue();
         } );

         this._CartService.istotalItem.subscribe( ()=>{
          this.istotalItem = this._CartService.istotalItem.getValue();
         } )
         this._CartService.istotalPrice.subscribe( ()=>{
          this.istotalPrice = this._CartService.istotalPrice.getValue();
         } )
      },
      error:(err)=>{
        console.log(err); 
      }
    })
  }

/////deleteItem
  deleteItemOfCart(pId:string|null|undefined){
    this.isLoadingScreen =true;
    this._CartService.removeCartItemAPI(pId).subscribe({
    next:(res)=>{
      this.isLoadingScreen =false;
      this.allProductItems = res.data.products;
      this._CartService.numOfCartItems.next(res.numOfCartItems);
      this.toastEvokeService.success('DeleteItem',res.status).subscribe();

      },
      error:(err)=>{console.log(err);
      }
    })
  }

///updateCartItem
updateCartItem(pId:string|null|undefined ,pCount:string ,WhichBtn:string){
  this.isLoadingScreen =true;
  if( WhichBtn == "plus"){
    this._CartService.updateProductCartAPI(pId , (Number(pCount)+1).toString()).subscribe({
      next:(res)=>{
        this.isLoadingScreen =false;
        console.log(res);
        this.totalPrice=res.data.totalCartPrice;
        this.toastEvokeService.success('addNewItem',res.status).subscribe();
        this.allProductItems = res.data.products;
      },
      error:(err)=>{console.log(err);
      }
    })
  }else{
    if(Number(pCount) == 0){
      this.deleteItemOfCart(pId)

    }else{
      this._CartService.updateProductCartAPI(pId , (Number(pCount)-1).toString()).subscribe({
        next:(res)=>{
          this.isLoadingScreen =false;
          console.log(res);
          this.totalPrice=res.data.totalCartPrice;
          this.toastEvokeService.success('deleteItem',res.status).subscribe();
          this.allProductItems = res.data.products;
        },
        error:(err)=>{console.log(err);
        }
      })
    }
}
}

///clear All cart
 clearAllCart(){
  this.isLoadingScreen =true;
  this._CartService.clearCartAPI().subscribe({
    next:(res)=>{
      this.isLoadingScreen =false;
      this.allProductItems = [];
      this._CartService.numOfCartItems.next(0);

      this._CartService.isButton.next(false);
      this._CartService.isEmptyCart.next(true);
      this._CartService.istotalItem.next(false);
      this._CartService.istotalPrice.next(false);

      
    },
    error:(err)=>{console.log(err);
    }
  })
}
}
