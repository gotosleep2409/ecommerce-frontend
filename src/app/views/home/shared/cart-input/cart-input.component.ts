import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {CartService} from "../../../../services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductItemComponent} from "../../home/home-page/products/product-item/product-item.component";

@Component({
  selector: 'app-cart-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogClose, MatSelectModule],
  templateUrl: './cart-input.component.html',
  styleUrl: './cart-input.component.scss'
})
export class CartInputComponent implements OnInit{
  empForm: FormGroup
  productSizesWithQuantity: { size: string, quantity: number }[]
  selectedSize: string
  constructor(private fb:FormBuilder,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<ProductItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private cartService: CartService) {
    this.empForm = this.fb.group({
      size:'',
      quantity:''
    })
  }
  ngOnInit() {
    this.productSizesWithQuantity = Object.keys(this.data.sizeQuantityMap).map(key => ({ size: key, quantity: this.data.sizeQuantityMap[key] }));
  }

  onFromSubmit() {
    this.cartService.addToCart(this.data,this.selectedSize , this.empForm.value.quantity)
    this.dialogRef.close(true)
    this.snackBar.open('Add to Cart successfully')
  }

  isOutOfStock(size: string): boolean {
    const selectedSizeQuantity = this.productSizesWithQuantity.find(item => item.size === size);
    return selectedSizeQuantity && selectedSizeQuantity.quantity === 0
  }

  isQuantityGreaterThanStock(): boolean {
    const quantity = this.empForm.get('quantity').value;
    const selectedSizeQuantity = this.productSizesWithQuantity.find(size => size.size === this.selectedSize)?.quantity;
    return !quantity || (quantity > selectedSizeQuantity);
  }

}
