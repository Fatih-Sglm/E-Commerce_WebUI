import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brands } from 'src/app/contracts/brands/brand';
import { CreateProduct } from 'src/app/contracts/products/create-product';
import { Types } from 'src/app/contracts/types/type';
import { ProductService } from 'src/app/services/common/models/product.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ResponseModel } from 'src/app/contracts/common/response-model';
import { NoContent } from 'src/app/contracts/common/nocontent';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/common/notification/custom-toaster.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent extends BaseComponent implements OnInit {
  constructor(private productService:ProductService ,private formbuilder: FormBuilder , spinnerService: NgxSpinnerService , private toasterService:CustomToastrService) {  super(spinnerService)}
  public files: NgxFileDropEntry[];
  fileList: any[] = [];
  brands : Brands[];
  types : Types[];

  formGroup : FormGroup;

 async ngOnInit(): Promise<void> {
    this.formGroup = this.formbuilder.group(
      {
        name :[ , [Validators.required]],
        description :[ , [Validators.required]],
        price :[ , [ Number, Validators.required]],
        catalogBrandId :[ , [Validators.required]],
        catalogTypeId :[ , [Validators.required]],
        folderPath :[ , [this.fileList != null ? Validators.required : "" ]],
      });
    const value = await this.productService.BrandAndTypes();
    this.brands = value.brands;
    this.types = value.types;
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = [];
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.fileList.push(file);
        });
      }
    }
  }

 async submit(value:CreateProduct)
  {
    
    this.showSpinner(SpinnerType.BallSpinFade);
    const response :ResponseModel<NoContent> = await this.productService.createProduct(this.addValueFormData(value) , 
    () => {this.hideSpinner(SpinnerType.BallSpinFade)});
    this.toasterService.message(response.message , "Ürün Ekleme", {
      toastrPosition : ToastrPosition.TopRight,
      toastrMessageType :ToastrMessageType.Success,
      timeout : 3
    })
  }

  addValueFormData(value:CreateProduct) : FormData{
    const formdata: FormData = new FormData();
    for(let i=0;i< this.fileList.length;i++){
      formdata.append("images" , this.fileList[i]);
    }
    formdata.append("catalogBrandId" , JSON.stringify(value.catalogBrandId));
    formdata.append("catalogTypeId" , JSON.stringify(value.catalogTypeId));
    formdata.append("description" , value.description);
    formdata.append("folderPath" , value.folderPath);
    formdata.append("name" , value.name);
    formdata.append("price" ,this.formatDecimal(value.price));
    return formdata;
  }

  formatDecimal(number :number) : string{
    return number.toString().replace("." ,",");;
  }

  // async CreateProduct(name : string , description : string , price : string , catalogBrandId : number , catalogTypeId : number ,  folderPath : string )
  // {
  //   const createProduct : CreateProduct = new CreateProduct();
  //   createProduct.name = name;createProduct.price = parseFloat(price);
  //   
  // }

}
