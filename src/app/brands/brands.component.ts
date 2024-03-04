import { Brands } from './../brands';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';


declare let $:any;
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
  allbrands:Brands[]=[];
  isLoadingScreen:boolean=false;
  bId:string="";
  SubBrands:any;

  constructor(private _BrandsService:BrandsService){}
  ngOnInit(): void{
    $(document).ready(function(){
      $(".spinner").fadeOut(1000,function(){
        $(".loading").fadeOut(1000, function(){
          $("body").css('overFlow','auto');
        })

      })
    });
    this.isLoadingScreen =true;
    this._BrandsService.getAllBrandsAPI().subscribe({
      next:(res)=>{
        this.isLoadingScreen =false;
        // console.log(res.data);
        this.allbrands =res.data;
        this.bId=res.data._id;
        
      },
      error:(err)=>{console.log(err);
      }
    })

    localStorage.setItem("currentPage" ,"/brands");
  }


  getSpecificBrand(bId:any){
    this._BrandsService.getSpecificBrand(bId).subscribe({
      next:(res)=>{
        // console.log(res.data);
        // this.bId=res.data._id;
        this.SubBrands =res.data;

        // console.log(this.SubBrands);
        // console.log(this.bId);
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  getSupBrand(id:any){
    
    this.getSpecificBrand(id)
  }

}
