import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Brands } from 'src/app/contracts/brands/brand';
import { NoContent } from 'src/app/contracts/common/nocontent';
import { Paginate } from 'src/app/contracts/common/paginate';
import { ResponseModel } from 'src/app/contracts/common/response-model';
import { CreateProduct } from 'src/app/contracts/products/create-product';
import { ProductDetailModel } from 'src/app/contracts/products/product-detail-model';
import { ProductModel } from 'src/app/contracts/products/product-model';
import { Types } from 'src/app/contracts/types/type';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclientService: HttpClientService) { }

  async getProduct(page: number , pageSize : number , succesCallbak?: () => void) : Promise<ResponseModel<Paginate<ProductModel>>>
  {
    const observable : Observable<ResponseModel<Paginate<ProductModel>>> = this.httpclientService.get<ResponseModel<Paginate<ProductModel>>>({
      controller: "catalog",
      action :'GetCatalogList',
      queryString :`Page=${page}&PageSize=${pageSize}`,
    });
    return await firstValueFrom(observable);
  };


async getProductDetail(id : any ,succesCallbak?: () => void, errorCallbak?: () => void ) : Promise<ProductDetailModel>{
    const product : Observable<ResponseModel<ProductDetailModel>> =  this.httpclientService.get({
      controller: "catalog",
      action :'GetCatalogItem',
    },id);
   return (await firstValueFrom(product)).data;
  }

 async BrandAndTypes() : Promise<BrandAndTypes>{
    const brandAndTypes : Observable<BrandAndTypes> = this.httpclientService.get<BrandAndTypes>({
      controller : "catalog",
      action : "GetCatalogBrandsAndTypes"
    });
    return await firstValueFrom(brandAndTypes);
  }

 async createProduct(formdata : FormData ,succesCallbak?: () => void){
    const value  =  this.httpclientService.post<any ,ResponseModel<NoContent>>({
      controller: "catalog",
      action :'AddCatalogItem',
    }, formdata);
    const response = await firstValueFrom(value);
    succesCallbak();
    return response;
  }
}



export class BrandAndTypes
{
  brands : Brands[];
  types : Types[]
}

