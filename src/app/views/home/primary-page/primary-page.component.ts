import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "../shared/nav/nav.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {BannerComponent} from "../shared/banner/banner.component";
import {CardCategoriesComponent} from "./card-categories/card-categories.component";
import {CategoriesService} from "../../../services/categories.service";
import {CardProductsComponent} from "./card-products/card-products.component";
import {ChatboxComponent} from "../shared/chatbox/chatbox.component";
import {ProductsService} from "../../../services/products.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-primary-page',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent, BannerComponent, CardCategoriesComponent, CardProductsComponent, ChatboxComponent, RouterLink],
  templateUrl: './primary-page.component.html',
  styleUrl: './primary-page.component.scss'
})
export class PrimaryPageComponent implements OnInit{
  categoriesList: any = []
  featuredProducts: any
  constructor(private categoriesService: CategoriesService, private productService: ProductsService) {
  }
  ngOnInit() {
    this.getList()
    this.getFeaturedProducts();
  }

  getList() {
    this.categoriesService.getListByPage(1, 10).subscribe((response: any) => {
      this.categoriesList = response.data.content
    }, (error: any) => {
      console.log(error)
    })
  }
  getFeaturedProducts(): void {
    this.productService.getListByPageForPrimaryPage().subscribe({
        next: (response: any) => {
          this.featuredProducts = response.data
          console.log(this.featuredProducts)
        },
        error: (err) => {
          console.error('Error fetching featured products', err);
        }
      })
  }
}
