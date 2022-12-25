import { Injectable } from '@angular/core';
declare var alertify :any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }
  message(message : string , options : Partial<AlertifyOptions> ){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msg = alertify[options.messageType](message);
    if(options.dismissOther)
        msg.dismissOthers();
  }
}



export class AlertifyOptions{
  messageType? : MessageType = MessageType.Notify;
  position? : Position = Position.TopRight;
  delay? :Number = 2;
  dismissOther? : boolean = true;
}



//Alertify Message tipleri
export enum MessageType{
  Error ="error",
  Message = "message",
  Succes = "success",
  Notify = "notify",
  Warning = "warning"
}

//Alertify Mesajın hangş posizyonda Geleceği
export enum Position{
  TopRight ="top-right",
  TopCenter="top-center",
  TopLeft = "top-left",
  BottomRight ="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft = "bottom-left"
}

