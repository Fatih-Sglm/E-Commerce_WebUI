import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { LoginComponent } from '../components/login/login.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends BaseComponent {
  constructor(private viewportScroller: ViewportScroller,private router: Router,spinner : NgxSpinnerService)
  {
    super(spinner);
    this.router.events.subscribe((e : RouterEvent) => {
      this.navigationInterceptor(e);
    })
  }
  
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      
      this.showSpinner(SpinnerType.BallScaleMultiple);
    }
    if (event instanceof NavigationEnd) {
      
      this.hideSpinner(SpinnerType.BallScaleMultiple);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.hideSpinner(SpinnerType.BallScaleMultiple);
    }
    if (event instanceof NavigationError) {
      this.hideSpinner(SpinnerType.BallScaleMultiple);
    }
  }
  
  gotoTop() {
    this.viewportScroller.scrollToPosition([0,0]);
  }
    
}
