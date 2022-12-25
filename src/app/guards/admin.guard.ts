import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from '../base/base.component';
import { isAuthenticated, isAuthorized } from '../services/common/auth.service';
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../services/common/notification/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/common/notification/custom-toaster.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
 constructor(private alertiyervice : AlertifyService, private spinner : NgxSpinnerService,private router : Router){}
 
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.spinner.show(SpinnerType.BallSpinFade);
    if(!isAuthorized){
      this.alertiyervice.message("Bu Sayfaya Giriş Yetkiniz Bulunmamaktadır", {
        messageType : MessageType.Error,
        position : Position.TopRight,
        dismissOther : true 
      });
      this.router.navigate(["/login"], { queryParams : {returnUrl : state.url}});
      this.spinner.hide(SpinnerType.BallSpinFade);
      return false;
    }
    this.spinner.hide(SpinnerType.BallSpinFade);
    return true;
  }
  
}
