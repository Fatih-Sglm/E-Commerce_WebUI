import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }
  message(message: string , title: string, options : Partial<ToastrMessageOptions>){
    this.toastr[options.toastrMessageType](message , title , {
      positionClass:options.toastrPosition,
      timeOut: options.timeout * 1000,
    })
  }
}


export class ToastrMessageOptions{
  toastrMessageType : ToastrMessageType;
  toastrPosition : ToastrPosition;
  timeout : number
}


export enum ToastrMessageType{
  Error ="error",
  Success = "success",
  info = "info",
  Warning = "warning"
}

//Alertify Mesajın hangş posizyonda Geleceği
export enum ToastrPosition{
  TopRight ="toast-top-right",
  TopCenter="toast-top-center",
  TopLeft = "toast-top-left",
  BottomRight ="toast-bottom-right",
  BottomCenter="toast-bottom-center",
  BottomLeft = "toast-bottom-left",
  TopFullWidth ="toast-top-full-width",
  BottomFullWidth ="toast-top-full-bottoö"
}


 /*export class iconClasses {
  error: 'toast-error';
  info: 'toast-info';
  success: 'toast-success';
  warning: 'toast-warning';
};
*/