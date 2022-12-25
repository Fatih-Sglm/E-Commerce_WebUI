import { DecimalPipe } from "@angular/common";

export class CreateProduct
{
    name: string;
    description : string;
    price : number;
    catalogBrandId : number;
    catalogTypeId : number;
    folderPath? : string;
}


// public string Name { get; set; }
//         public string Description { get; set; }
//         public decimal Price { get; set; }
//         public uint CatalogBrandId { get; set; }
//         public uint CatalogTypeId { get; set; }
//         public string FolderPath { get; set; }
//         public IFormFileCollection? ImagesPath { get; set; }