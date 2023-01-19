import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginResponse } from 'src/app/contracts/auth/login-response';
import { User } from 'src/app/entities/user';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelper : JwtHelperService , private router : Router , private httpClientService : HttpClientService) {}
  declare decodeToken: any

  IdentityCheck(){
    const token : string = localStorage.getItem("accessToken");
    this.decodeToken = this.jwtHelper.decodeToken(token);
    isAuthenticated = token != null && !this.jwtHelper.isTokenExpired(token);
    if(isAuthenticated){
      this.setUserInformation();
      isAuthorized = user.roles.includes("Admin");
    }
    
  }

  get isAuthenticated() : boolean{
    return isAuthenticated;
  }

  get isAuthorized() : boolean{
    return isAuthorized;
  }

  getUserInfo(value : UserInfo) : string{
    return user[value];
  }

  setUserInformation(){
    user.name = this.decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    user.Id = this.decodeToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    user.mail = this.decodeToken.email;
    user.roles = this.decodeToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  logout(){
    
    localStorage.clear();
    window.location.reload();
  }

}

export let isAuthenticated : boolean;
export let user : User = new User();
export let isAuthorized : boolean;

export enum UserInfo
{
  Id ="Id",
  Name = "name",
  Email = "mail",
}