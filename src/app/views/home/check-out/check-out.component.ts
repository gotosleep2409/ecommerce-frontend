import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "../shared/nav/nav.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {CustomerInfoComponent} from "./customer-info/customer-info.component";
import {CartInfoComponent} from "./cart-info/cart-info.component";
import {CartService} from "../../../services/cart.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent, CustomerInfoComponent, CartInfoComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit{
  cartItem: any
  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getCartItem().subscribe(items => {
      this.cartItem = items
/*
      if (this.cartItem.length === 0) {
        alert('Không có sản phẩm trong giỏ hàng. Bạn sẽ được điều hướng về trang chủ.');
        this.router.navigate(['/home'])
      }*/
    });
  }
  ngOnInit() {

  }
}
