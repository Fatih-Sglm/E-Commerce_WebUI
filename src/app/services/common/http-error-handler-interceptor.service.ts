import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, of } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { NoContent } from 'src/app/contracts/common/nocontent';
import { ResponseModel } from 'src/app/contracts/common/response-model';
import { UserAuthService } from './models/user-auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './notification/custom-toaster.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorServices implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService, private router: Router, private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(catchError(error => {
     let customeError :ResponseModel<NoContent> = error.error;
     console.log(customeError);
      switch (error.status) {
        case HttpStatusCode.Unauthorized:

          // this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state) => {
          //   if (!state) {
          //     const url = this.router.url;
          //     if (url == "/products")
          //       this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.", "Oturum açınız!", {
          //         toastrMessageType: ToastrMessageType.Warning,
          //         toastrPosition: ToastrPosition.TopRight
          //       });
          //     else
          //       this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
          //         toastrMessageType: ToastrMessageType.Warning,
          //         toastrPosition: ToastrPosition.BottomFullWidth
          //       });
          //   }
          // }).then(data => {

            this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
              toastrMessageType: ToastrMessageType.Warning,
              toastrPosition: ToastrPosition.TopRight
            });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
            toastrMessageType: ToastrMessageType.Warning,
            toastrPosition: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı!", "Geçersiz istek!", {
            toastrMessageType: ToastrMessageType.Warning,
            toastrPosition: ToastrPosition.TopRight
          });
          break;
        case HttpStatusCode.NotFound:
          
          this.toastrService.message(customeError.errors[0], "Sayfa bulunamadı!", {
            toastrMessageType: ToastrMessageType.Warning,
            toastrPosition: ToastrPosition.TopRight,
            timeout: 1
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!", "Hata!", {
            toastrMessageType: ToastrMessageType.Warning,
            toastrPosition: ToastrPosition.TopRight
          });
          break;
      }

      this.spinner.hide(SpinnerType.BallScaleMultiple);
      this.spinner.hide(SpinnerType.SquareJellyBox);
      return of(error);
    }));
  }
  
}
