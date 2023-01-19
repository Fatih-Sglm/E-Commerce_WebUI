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
  BallScaleMultiple = "ball-scale-multiple",
  SquareJellyBox = "square-jelly-box",
  BallSpinFade = "ball-spin-fade",
  Search = "search",
  Pulse = "pulse"
}
