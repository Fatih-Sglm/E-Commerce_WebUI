import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/ui/components/login/login.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { BasketService } from 'src/app/services/common/models/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public basketService: BasketService
  ) {
    authService.IdentityCheck();
    basketService.BasketProductCount;
  }

  openLoginModal() {
    this.dialog.open(LoginComponent);
  }

  logout() {
    this.authService.logout();
  }
}
