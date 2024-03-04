import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryService{

  baseURL:string="https://ecommerce.routemisr.com";


  constructor(private _HttpClient:HttpClient) { }

  getAllSubCategoriesOnCategory(CategoryId:any):Observable<any>{

   return this._HttpClient.get(`${this.baseURL}/api/v1/categories/${CategoryId}/subcategories`);
  }

}
