import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WishListService {
  baseURL:string="https://ecommerce.routemisr.com";
  userHeader:any={token:localStorage.getItem("userToken")};
  isEmptyCart:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _HttpClient:HttpClient) {}


  addToWishList(pId:any):Observable<any>
  {
    return this._HttpClient.post(`${this.baseURL}/api/v1/wishlist`,{productId:pId},{
      headers:this.userHeader
    })

  }

  removeProductFromWishList(pId:any):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/wishlist/${pId}`,{
      headers:this.userHeader
    })
  }

  getAllUserWishList():Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/wishlist`,{
      headers:this.userHeader
    })
  }
}
