import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subscription} from "rxjs";
import {CartService} from "../../../../services/cart.service";
import {FormsModule} from "@angular/forms";
import {DiscountCodeService} from "../../../../services/discountCode.service";

@Component({
  selector: 'app-cart-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-info.component.html',
  styleUrl: './cart-info.component.scss'
})
export class CartInfoComponent implements OnInit{
  cartItem = []
  cartSubscription: Subscription
  discountCode: string = ''
  discountValue: number = 0
  discountApplied: boolean = false
  constructor(private cartService: CartService, private discountService: DiscountCodeService) {
  }

  ngOnInit() {
    this.cartSubscription = this.cartService.getCartItem().subscribe(items => {
      this.cartItem = items
    })
    this.discountCode = this.cartService.cartDiscount.code
    this.discountValue = this.cartService.cartDiscount.value
    this.discountApplied = this.cartService.cartDiscount.discountApplied
  }

  quantityCart(){
    return this.cartService.countCart()
  }
  calculateCartTotal() {
    return this.cartService.cartTotal
  }

  applyDiscount() {
    this.discountService.checkDiscountCode(this.discountCode).subscribe(
      (response: any) => {
        if (response.percentDiscount !== '0') {
          if(response.duration){
            /*const total = this.cartService.cartTotal
            const discountAmount = total * (response.percentDiscount / 100)

            this.cartService.cartTotal = total - discountAmount
            this.discountApplied = true*/
            this.discountValue = response.percentDiscount
            this.cartService.addDiscount(this.discountCode, response.percentDiscount)
            this.discountCode = this.cartService.cartDiscount.code
            this.discountValue = this.cartService.cartDiscount.value
            this.discountApplied = this.cartService.cartDiscount.discountApplied
          }
          else {
            this.discountValue = 0
            alert('Code đã hết hạn sử dụng')
          }
        } else {
          this.discountValue = 0
          alert('Invalid discount code')
        }
      },
      (error) => {
        this.discountValue = 0
        alert('Error applying discount')
      }
    );
  }

  calculateDiscountedTotal() {
    /*const total = this.calculateCartTotal()
    return total - (total * this.discountValue / 100)*/
    return this.cartService.cartTotal
  }
}
