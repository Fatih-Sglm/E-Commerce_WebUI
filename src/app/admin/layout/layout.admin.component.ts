import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/admin/sidebar.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout.admin.component.html',
  styleUrls: ['./layout.admin.component.scss']
})
export class LayoutAdminComponent {
  constructor(public sidebarService: SidebarService , private viewportScroller: ViewportScroller){}

  gotoTop() {
    this.viewportScroller.scrollToPosition([0,0]);
  }
}
