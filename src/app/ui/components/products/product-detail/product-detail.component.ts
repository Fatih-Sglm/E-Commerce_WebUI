import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductDetailModel } from 'src/app/contracts/products/product-detail-model';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends BaseComponent {
  constructor(private activateRoute: ActivatedRoute, private productService: ProductService, private spinnerService :NgxSpinnerService ) {super(spinnerService) }
  productDetail: ProductDetailModel;
  async ngOnInit(): Promise<void> {
    
    this.showSpinner(SpinnerType.BallScaleMultiple);
    this.productDetail = await this.getProductDetail()
    
    this.hideSpinner(SpinnerType.BallScaleMultiple);
  };

  async getProductDetail(): Promise<ProductDetailModel> {
    const id = this.activateRoute.snapshot.paramMap.get("id");
    return (await this.productService.getProductDetail(id));
  }
}
