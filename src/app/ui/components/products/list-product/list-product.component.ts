import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap,
  QueryParamsHandling,
  Router,
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Paginate } from 'src/app/contracts/common/paginate';
import { ResponseModel } from 'src/app/contracts/common/response-model';
import { Sorted } from 'src/app/contracts/common/Sorted';
import { ProductModel } from 'src/app/contracts/products/product-model';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent extends BaseComponent {
  constructor(
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super(spinnerService);
  }
  productClass: string = 'col-lg-4 col-sm-2';

  page: number;
  pagesize: number = 12;
  totalPageCount: number;
  TotalProductCount: number;
  Products: ProductModel[];
  pageList: number[] = [];
  hasPrevious: boolean;
  hasNext: boolean;
  isLarge: boolean = true;
  sortingItems = new Sorted();

  sorting: Sorting[] = [
    { value: 'default', viewValue: 'Default sorting' },
    //{value: 'popularity', viewValue: 'Popularity'},
    { value: 'low-high', viewValue: 'Low to High' },
    { value: 'high-low', viewValue: 'High to Low' },
  ];

  selectedSort = this.sorting[0].value;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.activatedRoute.queryParamMap.subscribe(async (params) => {
      this.showSpinner(SpinnerType.Pulse);
      debugger;
      this.page = parseInt(
        this.activatedRoute.snapshot.queryParamMap.get('page') ?? '0'
      );
      var response = await this.productService.getProduct(
        this.page > 0 ? this.page - 1 : this.page,
        this.pagesize,
        this.setSorted()
      );
      debugger;
      this.Products = response.data.items;
      this.TotalProductCount = response.data.count;
      this.hasPrevious = response.data.hasPrevious;
      this.hasNext = response.data.hasNext;
      this.totalPageCount = Math.ceil(response.data.count / this.pagesize);
      this.setPageList();
      this.hideSpinner(SpinnerType.Pulse);
    });
  }

  setSorted(): Sorted {
    if (this.sortingItems.Dir || this.sortingItems.Field) {
      return this.sortingItems;
    } else {
      return null;
    }
  }
  setPageList() {
    this.pageList = [];
    let size = this.totalPageCount > 7 ? 7 : this.totalPageCount;
    if (this.page - 3 <= 0)
      for (let i = 1; i <= size; i++) this.pageList.push(i);
    else if (this.page + 3 >= this.totalPageCount)
      for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
        this.pageList.push(i);
    else
      for (let i = this.page - 3; i <= this.page + 3; i++)
        this.pageList.push(i);
  }

  onOptionsSelected(value: string) {
    switch (value) {
      case 'low-high': {
        this.sortingItems.Dir = 'asc';
        this.sortingItems.Field = 'price';
        this.getProducts();
        break;
      }
      case 'high-low': {
        this.sortingItems.Dir = 'desc';
        this.sortingItems.Field = 'price';
        this.getProducts();
        break;
      }
      case 'default': {
        this.sortingItems.Dir = '';
        this.sortingItems.Field = '';
        this.getProducts();
        break;
      }
    }
  }

  setSmallElement() {
    this.isLarge = false;
    this.pagesize = this.pagesize * 2;

    this.ngOnInit();
    this.productClass = 'col-lg-2 col-sm-2';
  }

  setLargeElement() {
    this.isLarge = true;
    this.pagesize = 3;
    this.ngOnInit();
    this.productClass = 'col-lg-4 col-sm-2';
  }
  nextPage() {
    this.ChangePage(this.page - 1);
  }

  ChangePage(pageNo: number) {
    this.router.navigate(['/products'], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
      queryParams: { page: pageNo },
    });
    //console.log(this.sortingItems);
  }

  PreviousPage() {
    this.ChangePage(this.page + 1);
  }
}

interface Sorting {
  value: string;
  viewValue: string;
}
