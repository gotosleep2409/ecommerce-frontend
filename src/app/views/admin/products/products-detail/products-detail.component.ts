import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductsService} from "../../../../services/products.service";
import {CategoriesService} from "../../../../services/categories.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

interface Category {
  id: number
  name: string
  urlImage: string
}

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogContent, MatInputModule, MatSelectModule, MatDialogActions, MatButtonModule, MatDialogClose],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {

}
