import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from "../home-page/cart/cart.component";
import {FiltersComponent} from "../home-page/filters/filters.component";
import {ProductsComponent} from "../home-page/products/products.component";

@Component({
  selector: 'app-product-category',
  standalone: true,
    imports: [CommonModule, CartComponent, FiltersComponent, ProductsComponent],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.scss'
})
export class ProductCategoryComponent {

}
