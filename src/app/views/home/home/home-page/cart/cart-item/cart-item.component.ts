import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() cartItem: any
  getTotalQuantity(cartItem: any): number {
    let totalQuantity = 0
    for (let size of cartItem.sizes) {
      totalQuantity += size.quantity
    }
    return totalQuantity
  }

  getTotalPrice(cartItem: any): number {
    return cartItem.price * this.getTotalQuantity(cartItem)
  }
}
