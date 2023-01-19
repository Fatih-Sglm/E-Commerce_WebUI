import { Component, OnInit } from '@angular/core';
import { Types } from 'src/app/contracts/types/type';
import { CategoryService } from 'src/app/services/common/models/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}
  categories: any;
  async ngOnInit() {
    await this.getCategories();
  }

  async getCategories(): Promise<void> {
    this.categories = await this.categoryService.getCategories();
  }
}
