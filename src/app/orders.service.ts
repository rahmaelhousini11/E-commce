import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseURL:string="https://ecommerce.routemisr.com";
  userHeader:any={token:localStorage.getItem("userToken")};

  constructor(private _HttpClient:HttpClient) { }

  checkOutAPI(cartId:string ,formValue:any):Observable<any>
  {                                           
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{shippingAddress:formValue},{
      headers: this.userHeader
    })
  }

}

