import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseURL:string="https://ecommerce.routemisr.com"

  constructor(private _HttpClient:HttpClient) { }

  getProductAPI():Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products`)

  }

  getSpecificProductAPI(pId:string):Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products/${pId}`)

  }
}
