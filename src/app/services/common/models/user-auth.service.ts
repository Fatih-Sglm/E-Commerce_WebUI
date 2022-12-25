import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginModel } from 'src/app/contracts/auth/login-model';
import { LoginResponse } from 'src/app/contracts/auth/login-response';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService : HttpClientService) { }

login(loginUser : LoginModel, successCallBack?: () => void){
     this.httpClientService.post<LoginModel , LoginResponse>({
      controller: "auth",
      action: "login"
    }, loginUser).subscribe({
      next(value) {
      localStorage.setItem("accessToken", value.token);
      localStorage.setItem("refreshToken", value.refreshToken);
      successCallBack();  
      },});      
  }
  
 
}
