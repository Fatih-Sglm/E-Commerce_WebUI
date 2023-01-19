import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { isAuthenticated } from '../services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../services/common/notification/custom-toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private toasterService : CustomToastrService, 
    private spinner : NgxSpinnerService,
    private router : Router
    ){}

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    this.spinner.show(SpinnerType.BallSpinFade);
    
    if(!isAuthenticated ){
      this.toasterService.message("Lütfen Giriş Yapınız" , "Yetkisiz Giriş" , {
        toastrMessageType : ToastrMessageType.Warning,
        toastrPosition : ToastrPosition.TopRight,
        timeout : 1.5
      });
      
      this.router.navigate(["/"], { queryParams : {returnUrl : state.url}});
      this.spinner.hide(SpinnerType.BallSpinFade);
      return false;
    }
    this.spinner.hide(SpinnerType.BallSpinFade);
    return true;
  }
  
}
 