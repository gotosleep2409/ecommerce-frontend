import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductsService} from "../../../../services/products.service";
import {CategoriesService} from "../../../../services/categories.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";

interface Category {
  id: number
  name: string
  urlImage: string
}

@Component({
  selector: 'app-products-action',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogContent, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, MatDialogClose, MatDialogTitle, FormsModule, MatIconModule],
  templateUrl: './products-action.component.html',
  styleUrl: './products-action.component.scss'
})
export class ProductsActionComponent {
  empForm: FormGroup
  categoryList: any = []
  currentPage: number = 1
  size: number = 10
  totalPages: number = 0
  totalElements: number = 0
  defaultSelectedCategories : any
  userName: string = ''
  sizeQuantityMap: { size: string, quantity: number }[] = []
  sizeOptions: string[] = ['S', 'M', 'L', 'XL']
  constructor(private fb:FormBuilder,
              private productsService:ProductsService,
              private categoriesService:CategoriesService,
              private dialogRef: MatDialogRef<ProductsActionComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const userInfoString = sessionStorage.getItem('user_info')
    if(userInfoString!= null){
      const userInfo = JSON.parse(userInfoString)
      this.userName = userInfo.user.name
    }

    this.empForm = this.fb.group({
      name:'',
      description:'',
      detail:'',
      creator:this.userName,
      imageUrl:'',
      price:'',
      priceSale:'',
      quantity:'',
      categories: [[], Validators.required],
      sizeQuantityMap: this.fb.array([]) })
  }

  ngOnInit() {
    const userInfoString = sessionStorage.getItem('user_info')
    if(userInfoString!= null){
      const userInfo = JSON.parse(userInfoString)
      this.userName = userInfo.user.name
    }

    if(this.data){
      this.defaultSelectedCategories = (this.data.categories as Category[]).map(obj => obj.id)
      const sizeQuantityArray = this.convertToSizeQuantityArray(this.data.sizeQuantityMap)
      this.sizeQuantityMap = sizeQuantityArray

      const sizeQuantityFormArray = this.empForm.get('sizeQuantityMap') as FormArray
      sizeQuantityArray.forEach(sizeQuantity => {
        sizeQuantityFormArray.push(this.fb.group({
          size: [sizeQuantity.size, Validators.required],
          quantity: [sizeQuantity.quantity, Validators.required]
        }))
      })

      this.empForm.patchValue({
          name: this.data.name,
          description: this.data.description,
          detail: this.data.detail,
          creator: this.data.creator,
          imageUrl: this.data.imageUrl,
          price:this.data.price,
          quantity:this.data.quantity,
          categories: this.defaultSelectedCategories
      })
    }
    this.getCategoryList()
  }

  convertToSizeQuantityArray(input) {
    return Object.keys(input).map(key => ({ size: key, quantity: input[key] }))
  }

  getCategoryList(){
    this.categoriesService.getListByPage(this.currentPage, this.size).subscribe((response: any) => {
      this.categoryList = response.data.content
      this.totalPages = response.data.totalPages
      this.currentPage = response.data.number + 1
      this.size = response.data.size
      this.totalElements = response.data.totalElements
    }, (error: any) => {
      console.log(error);
    })
  }

  onFromSubmit() {
    if(this.empForm.valid){
      if(this.data){
        this.productsService.updateProduct(this.data.id,this.empForm.value).subscribe({
          next: (val : any) => {
            this.snackBar.open('Product updated')
            this.dialogRef.close(true)
          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
      else {
        this.productsService.addProduct(this.empForm.value).subscribe({
          next: (val : any) => {
            this.snackBar.open('Product added successfully')
            this.dialogRef.close(true)

          },
          error: (err: any) => {
            console.error(err)
          }
        })
      }
    }
  }

  removeSizeQuantity(index: number) {
    const sizeQuantityArray = this.empForm.get('sizeQuantityMap') as FormArray
    sizeQuantityArray.removeAt(index)
  }

  addSizeQuantity() {
    const sizeQuantityFormGroup = this.fb.group({
      size: ['', Validators.required],
      quantity: ['', Validators.required]
    });
    (this.empForm.get('sizeQuantityMap') as FormArray).push(sizeQuantityFormGroup)
  }

  get sizeQuantityControls() {
    return (this.empForm.get('sizeQuantityMap') as FormArray).controls
  }
}
