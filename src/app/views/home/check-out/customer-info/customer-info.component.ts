import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CartService} from "../../../../services/cart.service";
import {BillService} from "../../../../services/bill.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './customer-info.component.html',
  styleUrl: './customer-info.component.scss'
})
export class CustomerInfoComponent implements OnInit{
  paymentMethod: any
  private cartItem: any[]
  empForm: FormGroup
  paymentStatus: any
  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private cartService: CartService, private billService: BillService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      notes: [''],
    })
    this.cartService.cartItem.subscribe(items => {
      this.cartItem = items
    })

    this.route.queryParams.subscribe(params => {
      let transactionStatus = params['vnp_TransactionStatus']
      let data = JSON.parse(this.cookieService.get("cartInfo"))
      if (transactionStatus) {
        if (transactionStatus === '00') {
          console.log(data)
          this.billService.createBill(data).subscribe((value: any) => {
            console.log(value)
            this.router.navigate(['/paymentSuccess'])
            this.cartService.clearCart()
          })
        } else {
          this.paymentStatus = "Fail"
        }
      }
    })
  }

  onFromSubmit() {
    const data= {
      name : this.empForm.value.name,
      email : this.empForm.value.email,
      address: this.empForm.value.address,
      phone: this.empForm.value.phone,
      notes: this.empForm.value.notes,
      paymentMethod: this.paymentMethod,
      billDetails: this.cartItem,
      totalPrice: this.cartService.cartTotal
    }
    this.cookieService.set("cartInfo",JSON.stringify(data))
    if(this.paymentMethod == 'E-payment'){
      this.billService.vnPay(data).subscribe((value: any) => {
        window.location.href = value.paymentUrl
      })
    }
    else {
      this.billService.createBill(data).subscribe((value: any) => {
        this.router.navigate(['/paymentSuccess'])
        this.cartService.clearCart()
      })
    }
  }
}