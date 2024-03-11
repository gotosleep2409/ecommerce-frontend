import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../../services/products.service";
import {size} from "lodash-es";
import {CartService} from "../../../../services/cart.service";
import {FormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-page-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatExpansionModule, MatTabsModule],
  templateUrl: './page-product-detail.component.html',
  styleUrl: './page-product-detail.component.scss'
})
export class PageProductDetailComponent {
  constructor(private router: ActivatedRoute,
              private productService : ProductsService,
              private cartService: CartService,
              private snackBar: MatSnackBar) {
  }

  productId: string = null
  productItem : any = []
  productSizesWithQuantity: { size: string, quantity: number }[]
  quantityVisible: boolean = false
  selectedQuantity: number = 0
  selectedSize: string
  quantity: any = 1
  async ngOnInit() {
    this.router.params.subscribe((params) => {
      if (params && params['productId']) {
        this.productId = params['productId']
        if (this.productId != null) {
          this.productService.getProduct(Number(this.productId)).subscribe((value: any) => {
            this.productItem = value
            this.productSizesWithQuantity = Object.keys(this.productItem.sizeQuantityMap).map(key => ({ size: key, quantity: this.productItem.sizeQuantityMap[key] }));
          })
        }
      }
    });
  }

  onSizeClick(item: { size: string, quantity: number }) {
    this.selectedQuantity = item.quantity;
    this.quantityVisible = true;
    this.selectedSize = item.size;
  }

  addToCart(productItem: any, size: any, quantity: any) {
    if (this.isOutOfStock(size)) {
      alert('Size is invalid or out of stock')
    } else {
      this.cartService.addToCart(productItem, size, quantity)
      this.snackBar.open('Add to Cart successfully')
    }
  }

  isOutOfStock(size: string) {
    if(this.selectedQuantity > 0){
      return false
    }
    else {
      return true
    }
  }
}
