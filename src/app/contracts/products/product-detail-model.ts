export class ProductDetailModel {
    id : number;
    name : string;
    description : string;
    price : number;
    catalogBrandName : string;
    catalogTypeName : string;
    catalogItemsImagesPath? : string[];
    catalogItemsVariants? : string[];
}
