import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
constructor( private spinner : NgxSpinnerService) {}

showSpinner(spinnerNameType :SpinnerType , timeout? : number){
this.spinner.show(spinnerNameType);
if(timeout){
  setTimeout(() => {
    this.spinner.hide(spinnerNameType);
  }, timeout * 1000);
}}


hideSpinner(spinnerNameType :SpinnerType){
  this.spinner.hide(spinnerNameType);

}


}

export enum SpinnerType{
  BallScaleMultiple = "s1",
  SquareJellyBox = "s2",
  BallSpinFade = "s3"
}
