import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { UserBasket } from 'src/app/contracts/baskets/user-basket';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private httpClientService : HttpClientService) { }

  userBasket : UserBasket;
  async getUserBasket(succesCallback?: () => void , errorCallback?: (error: any) => void) : Promise<UserBasket>{
     const userBasket : Observable<UserBasket> = this.httpClientService.get<UserBasket>({
       controller:"basket",
       action :"GetBasket"
     });
    this.userBasket =  await firstValueFrom(userBasket);
    return this.userBasket;
   }

   get BasketProductCount() : number{
    return this.userBasket?.items.length;
   }

  removeBsketItem(id:string)
   {
      const value : Observable<any> = this.httpClientService.delete({
        controller :"basket",
        action:"DeleteBasketItem"
      },id);
      value.subscribe();
      window.location.reload();
   }


}
