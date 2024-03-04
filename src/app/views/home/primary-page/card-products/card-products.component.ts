import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesService} from "../../../../services/categories.service";
import {CardBodyComponent, CardComponent, CardGroupComponent} from "@coreui/angular";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-card-products',
  standalone: true,
  imports: [CommonModule, CardBodyComponent, CardComponent, CardGroupComponent],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.scss'
})
export class CardProductsComponent implements OnInit{
  @Input() categoryItem: any
  constructor(private categoriesService: CategoriesService, private cartService : CartService) {
  }

  ngOnInit(): void {
    this.test(this.categoryItem)
  }

  test(category: any): void {
    this.categoriesService.getListByCategoryId(category.id, 1, 4).subscribe((value: any) => {
      category.products = value.data.content
    })
  }

  addToCart(product : any) {
    this.cartService.addToCart(product)
  }
}
