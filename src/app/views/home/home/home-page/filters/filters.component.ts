import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CategoriesService} from "../../../../../services/categories.service";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit{
  from: number | null = null
  to: number | null = null
  categories: any
  selectedCategory: any | null = null
  @Output() filtersChanged = new EventEmitter<{ from: number | null; to: number | null; category: any | null }>()

  constructor(private categoriesService: CategoriesService) {
    this.from = 0
    this.to = 10000000
  }
  ngOnInit(){
    this.categoriesService.getListByPage(1, 10).subscribe((response: any) => {
      this.categories = response.data.content
    }, (error: any) => {
      console.log(error)
    })
  }
  toggleCategory(category: any) {
    if (this.selectedCategory && this.selectedCategory.id === category.id) {
      this.selectedCategory = null
    } else {
      this.selectedCategory = category
    }
    this.applyFilters()
  }

  applyFilters() {
    this.filtersChanged.emit({
      from: this.from,
      to: this.to,
      category: this.selectedCategory
    })
  }

  updateRange() {
    if (this.from > this.to) {
      this.to = this.from
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }
}
