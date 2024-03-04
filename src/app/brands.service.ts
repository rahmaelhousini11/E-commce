import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseURL:string="https://ecommerce.routemisr.com"
  constructor(private _HttpClient:HttpClient) { }

  getAllBrandsAPI():Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands`);
  }

  getSpecificBrand(bId:any):Observable<any>
  {
    return this._HttpClient.get(`${this.baseURL}/api/v1/brands/${bId}`)
  }

}
