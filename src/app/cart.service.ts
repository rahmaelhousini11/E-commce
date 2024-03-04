import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseURL:string="https://ecommerce.routemisr.com";
  userHeader:any={token:localStorage.getItem("userToken")};
  // numCartItem:string="";

  numOfCartItems:BehaviorSubject<any> =new BehaviorSubject(0);


  istotalPrice:BehaviorSubject<boolean> = new BehaviorSubject(true);
  istotalItem:BehaviorSubject<boolean> = new BehaviorSubject(true);
  isButton:BehaviorSubject<boolean> = new BehaviorSubject(true);
  isEmptyCart:BehaviorSubject<boolean> = new BehaviorSubject(false);
 

  constructor(private _HttpClient:HttpClient) { 
    
    this.getAllCartAPI().subscribe({
      next:(res)=>{
       this.numOfCartItems.next(res.numOfCartItems)
      },
      error:(err)=>{console.log(err);
      }
    })
  }


  addProductToCartAPI(pId:string|null|undefined):Observable<any>
  {                                          //API                  //body       //header      
    return this._HttpClient.post(`${this.baseURL}/api/v1/cart` ,{productId:pId},{
      headers:this.userHeader ||""
    })
  }


  updateProductCartAPI(pId:string|null|undefined ,count:string):Observable<any>
  {                                           
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${pId}` ,{count : count},{
      headers: this.userHeader
    })
  }


  getAllCartAPI():Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart` ,{
      headers:this.userHeader
    })
  }


  removeCartItemAPI(pId:string|null|undefined):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${pId}`,{
      headers:this.userHeader
    })
  }


  clearCartAPI():Observable<any>
  {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart`,{
      headers:this.userHeader

    })
  }

  allCategoryAPI():Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/categories`);
  }
}
