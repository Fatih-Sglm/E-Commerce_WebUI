import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './services/common/auth.service';
import { BasketService } from './services/common/models/basket.service';
import { LoginComponent } from './ui/components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce-UI';

  constructor(public authService : AuthService , public dialog : MatDialog , public basketService: BasketService) { 
    authService.IdentityCheck();
    basketService.BasketProductCount;
  }

  openLoginModal(){
    this.dialog.open(LoginComponent);
  }

  logout(){
    this.authService.logout();
  }
}
