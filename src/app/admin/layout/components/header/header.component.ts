import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/admin/sidebar.service';
import { AuthService, UserInfo } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private sidebarService : SidebarService , public authService: AuthService) { }
  name : String = this.authService.getUserInfo(UserInfo.Name);
  sideBarState : boolean;
  ngOnInit(): void {
  }

  changeState()
  {
    this.sidebarService.setState();
    this.sideBarState = this.sidebarService.getState();
    debugger;
  }

}
