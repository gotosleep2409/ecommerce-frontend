import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FiltersComponent} from "./filters/filters.component";
import {ProductsComponent} from "./products/products.component";
import {CartComponent} from "./cart/cart.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FiltersComponent, ProductsComponent, CartComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  selectedFilters: { from: number | null; to: number | null; category: number | null } = { from: null, to: null, category: null };

  onFiltersChanged(filters: { from: number | null; to: number | null; category: any | null }) {
    this.selectedFilters = filters;
  }
}
