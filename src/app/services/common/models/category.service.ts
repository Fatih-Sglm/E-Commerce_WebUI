import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Types } from 'src/app/contracts/types/type';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpclientService: HttpClientService) {}

  async getCategories(): Promise<Types[]> {
    const types: Observable<Types[]> = this.httpclientService.get<Types[]>({
      controller: 'catalog',
      action: 'GetCatalogTypes',
    });
    return await firstValueFrom(types);
  }
}
