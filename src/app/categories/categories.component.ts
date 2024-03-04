import { Category } from './../category';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';




declare let $:any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  allCategory:Category[]=[];
  isLoadingScreen:boolean=false;
  categoryId:string="";
  allSubCategoey:any;
  isClick:boolean=false;
  categoryName:any;


  constructor(private _CategoryService:CategoryService,private _CartService:CartService){}

  ngOnInit(): void{
    
    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    })
    this.isLoadingScreen =true;

    this._CartService.allCategoryAPI().subscribe({
      next:(res)=>{
        this.isLoadingScreen =false;
        console.log(res.data);
        this.allCategory=res.data;
      },
      error:(err)=>{console.log(err);
      }
    })
    
    localStorage.setItem("currentPage" ,"/categories");

  }

  getAllSubCategory(CategoryId:any){
    this._CategoryService.getAllSubCategoriesOnCategory(CategoryId).subscribe({
      next:(res)=>{
        this.isClick=true;
        console.log(res.data);
        this.allSubCategoey= res.data;
      //  this.categoryName =res.data;
      
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  allSubCategory(cId:any,cName:any){
    this.getAllSubCategory(cId);
    this.categoryName =cName;
  }


}
