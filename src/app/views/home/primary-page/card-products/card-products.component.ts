import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesService} from "../../../../services/categories.service";
import {CardBodyComponent, CardComponent, CardGroupComponent} from "@coreui/angular";
import {CartService} from "../../../../services/cart.service";
import {RouterLink} from "@angular/router";
import {CartInputComponent} from "../../shared/cart-input/cart-input.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-card-products',
  standalone: true,
  imports: [CommonModule, CardBodyComponent, CardComponent, CardGroupComponent, RouterLink],
  templateUrl: './card-products.component.html',
  styleUrl: './card-products.component.scss'
})
export class CardProductsComponent implements OnInit{
  @Input() categoryItem: any
  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getList(this.categoryItem)
  }

  getList(category: any): void {
    this.categoriesService.getListByCategoryId(category.id, 1, 4).subscribe((value: any) => {
      category.products = value.data.content
    })
  }

  addToCart(data : any) {
    const dialogRef = this.dialog.open(CartInputComponent, {
      width: '500px',
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:(val) => {
      }
    })
  }
}
