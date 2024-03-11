import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "../shared/nav/nav.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {BannerComponent} from "../shared/banner/banner.component";
import {CardCategoriesComponent} from "./card-categories/card-categories.component";
import {CategoriesService} from "../../../services/categories.service";
import {CardProductsComponent} from "./card-products/card-products.component";

@Component({
  selector: 'app-primary-page',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent, BannerComponent, CardCategoriesComponent, CardProductsComponent],
  templateUrl: './primary-page.component.html',
  styleUrl: './primary-page.component.scss'
})
export class PrimaryPageComponent implements OnInit{
  categoriesList: any = []
  constructor(private categoriesService: CategoriesService) {
  }
  ngOnInit() {
    this.getList()
  }

  getList() {
    this.categoriesService.getListByPage(1, 3).subscribe((response: any) => {
      this.categoriesList = response.data.content
    }, (error: any) => {
      console.log(error)
    })
  }
}
