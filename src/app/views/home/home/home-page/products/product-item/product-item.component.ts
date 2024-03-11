import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from "../../../../../../services/cart.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductsActionComponent} from "../../../../../admin/products/products-action/products-action.component";
import {CartInputComponent} from "../../../../shared/cart-input/cart-input.component";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit{
  @Input() productItem: any

  constructor(private cartService : CartService, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  addToCart(data){
    const dialogRef = this.dialog.open(CartInputComponent,{
      width: '500px',
      data,
    })
    dialogRef.afterClosed().subscribe({
      next:(val) => {
      }
    })
  }
}
