import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor() { }

  state = true;

  getState(){
    return this.state
  }

  setState(){
    debugger
    this.state = !this.state;
    
  }
  
}

export let state : boolean;


