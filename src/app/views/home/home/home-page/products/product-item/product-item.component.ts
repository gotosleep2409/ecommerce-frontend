import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from "../../../../../../services/cart.service";

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit{
  @Input() productItem: any;

  constructor(private cartService : CartService) {
  }

  ngOnInit() {
  }

  addToCart(){
    this.cartService.addToCart(this.productItem)
  }
}
