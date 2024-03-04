import { WishList } from './../wish-list';
import { Component } from '@angular/core';
import { WishListService } from '../wish-list.service';
// Import service from the library
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';



declare let $:any;

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent {
  allProductItems:WishList[]=[];
  isEmptyCart:boolean=false;
  isLoadingScreen:boolean=false;
  count:any;

  constructor(private _CartService:CartService,private toastEvokeService: ToastEvokeService,private _WishListService:WishListService){}
  ngOnInit(): void{
    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overflow','auto');
        })

      })
    });
    this.isLoadingScreen=true;
    this.isEmptyCart=true;

    localStorage.setItem("currentPage" ,"/wishList");

    this._WishListService.getAllUserWishList().subscribe({
      next:(res)=>{
        this.isEmptyCart=false;
        this.isLoadingScreen=false;
        this.allProductItems=res.data;
        this.count=res.count;

        if(this.count == null){
          this.isEmptyCart=true;
        }
       
      },
      error:(err)=>{console.log(err.status);
      }
    })
  }

  deleteItemOfWishList(pId:any){
    this.isLoadingScreen=true;
    this._WishListService.removeProductFromWishList(pId).subscribe({
    next:(res)=>{
      this.isLoadingScreen=false;
      this.allProductItems = res.data;
      this.count=res.count;
      if(this.count == null){
        this.isEmptyCart=true;
      }
      this.toastEvokeService.success(res.status,res.message).subscribe();
      },
      error:(err)=>{console.log(err.message);
      }
    })
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
}
