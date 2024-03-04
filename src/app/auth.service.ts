import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


interface accountData{
  name? :string,
  email :string,
  password :string,
  rePassword? :string,
  phone? :string,
  resetCode? :string,
  newPassword? :string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDataVar:BehaviorSubject<any> =new BehaviorSubject(null);
  baseURL:string="https://ecommerce.routemisr.com"


  constructor( private _HttpClient:HttpClient ,private _Router:Router) {
    // /cart ,/brands ...
    if( localStorage.getItem("currentPage")){
      _Router.navigate([localStorage.getItem("currentPage")])

    }
   }

//register IPA
//rData :{name ,email,pass,repass,phone}
  registerAPI(rData:accountData):Observable<any>
  { 
   return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signup` ,rData)
  }

//Login IPA
//rData :{email,password}

  LoginAPI(rData:accountData):Observable<any>
  { 
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` ,rData)
  }

//ForgetPass IPA
//rData :{email}
  forgetPassAPI(rData:accountData):Observable<any>
  { 
   return this._HttpClient.post(`${this.baseURL}/api/v1/auth/forgotPasswords` ,rData);
   
  } 

//verifyCode IPA
//rData :{code}
restCodeAPI(rData:accountData):Observable<any>
  { 
   return this._HttpClient.post(`${this.baseURL}/api/v1/auth/verifyResetCode` ,rData)
  } 

//setnewPassword IPA
//rData :{email ,newpassword}

  newPassAPI(rData:accountData):Observable<any>
  { 
   return this._HttpClient.put(`${this.baseURL}/api/v1/auth/resetPassword` ,rData)
  } 

////===============decode token===============
  SaveTokenMethod(){
    //token => encode ==> decode ==>all component can access

    if(localStorage.getItem("userToken") != null){
      this.userDataVar.next(localStorage.getItem("userToken"));
      //decode
      //object ==>name
      this.userDataVar.next(jwtDecode(this.userDataVar.getValue()));
      // console.log(this.userDataVar);
    }
    else{
      this.userDataVar.next(null)
    }
  }
}
