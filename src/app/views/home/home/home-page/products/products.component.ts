import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductItemComponent} from "./product-item/product-item.component";
import {ProductsService} from "../../../../../services/products.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  productList: any = []

  constructor(private productService: ProductsService, private httpClient: HttpClient) {
  }
  ngOnInit() {
    this.getList()
  }
  getList() {
    this.productService.getListByPage(1,12).subscribe((response: any) => {
      this.productList = response.data.content;
    });
  }
}
