import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BillService} from "../../../../services/bill.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-orders-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle],
  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.scss'
})
export class OrdersDetailComponent implements OnInit{
  billDetail: any
  selectedPaymentMethod: any
  statusList: string[] = ['Đang chuẩn bị hàng','Đã giao cho đơn vị vận chuyển','Đã giao hàng']
  paymentStatusList: string[] = ['Chờ thanh toán', 'Đã thanh toán','Chờ xác thực']
  empForm: FormGroup
  billProductDetail: any
  constructor(private fb:FormBuilder,
              private billService:BillService,
              private dialogRef: MatDialogRef<OrdersDetailComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any){
    this.empForm = this.fb.group({
      paymentMethod:'',
      paymentStatus:'',
      status:'',
      shoppingAddress:''
    })
  }

  ngOnInit() {
    this.billDetail = this.data
    this.selectedPaymentMethod = this.billDetail.paymentMethod
    this.getBillDetail()
    this.empForm.patchValue(this.data)
  }

  getBillDetail(){
    this.billService.getBillDetailByBillId(this.data.id).subscribe({
      next: (val : any) => {
        this.billProductDetail = val.products
        console.log(val)
      }
    })
  }

  onFromSubmit() {
    if(this.empForm.valid){
      const data = {
        id: this.data.id,
        paymentMethod: this.empForm.value.paymentMethod,
        paymentStatus: this.empForm.value.paymentStatus,
        status: this.empForm.value.status,
        shoppingAddress: this.empForm.value.shoppingAddress
      }
      this.billService.updateBill(data, this.data.id).subscribe({
        next: (val : any) => {
          this.snackBar.open('Bill added successfully')
          this.dialogRef.close(true)
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    }
  }


}

