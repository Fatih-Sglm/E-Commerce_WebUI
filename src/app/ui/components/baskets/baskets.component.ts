import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserBasket } from 'src/app/contracts/baskets/user-basket';
import { BasketService } from 'src/app/services/common/models/basket.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent implements OnInit {
constructor(private basketService : BasketService , private ngxSpinner : NgxSpinnerService){ super(ngxSpinner)}
userBasket : UserBasket;  


 async ngOnInit(): Promise<void> {
  this.showSpinner(SpinnerType.BallScaleMultiple);
  this.userBasket = await this.basketService.getUserBasket();
  this.hideSpinner(SpinnerType.BallScaleMultiple);
  }

removeBasketItem(id: string){
    this.basketService.removeBsketItem(id);
  }

}
