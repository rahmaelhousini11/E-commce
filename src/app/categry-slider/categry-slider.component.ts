import { Product } from '../product';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-categry-slider',
  templateUrl: './categry-slider.component.html',
  styleUrls: ['./categry-slider.component.css']
})
export class CategrySliderComponent implements OnInit{
  categoryData!:Product[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      150: {
        items: 2
      },
      300: {
        items: 3
      },
      500: {
        items: 4
      },
      600: {
        items: 5
      },
      700: {
        items: 6
      }
    },
    nav: true
  }

  constructor(private _CartService:CartService){}

  ngOnInit():void{
    this._CartService.allCategoryAPI().subscribe({
      next:(res)=>{
        console.log("hii");
        this.categoryData = res.data;
      },
      error:(err)=>{console.log(err);
      }
    })

  }

}
