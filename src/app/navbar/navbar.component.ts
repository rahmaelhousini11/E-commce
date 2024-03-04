import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogin :boolean =false;
  numOfCartItem!:any;

constructor(private _CartService:CartService,private _AuthService:AuthService ,private _Router:Router){}
  
///111
  ngOnInit():void{
    this._CartService.numOfCartItems.subscribe(()=>{
      this.numOfCartItem= this._CartService.numOfCartItems.getValue();  
    })

    this._AuthService.userDataVar.subscribe(()=>{

      if(this._AuthService.userDataVar.getValue() == null){
        this.isLogin =false;
      }else
      {
        this.isLogin =true;
      }
      
    })
  }

  logOut(){
    //1- remove userToken from localstorge
    localStorage.removeItem("userToken")
    //2- call SaveTokenMethod ===> userdatavar =null
    this._AuthService.SaveTokenMethod()
    //3- route to login page
    this._Router.navigate(["/login"])
  }
}
