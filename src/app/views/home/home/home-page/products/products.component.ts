import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductItemComponent} from "./product-item/product-item.component";
import {ProductsService} from "../../../../../services/products.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  productList: any = []
  productId: string = null
  constructor(private productService: ProductsService, private httpClient: HttpClient,private router: ActivatedRoute) {
  }
  /*ngOnInit() {
    this.getList()
  }*/

  async ngOnInit() {
    this.router.params.subscribe((params) => {
      if (params && params['categoryId']) {
        this.productId = params['categoryId']
      }
      this.getList()
    })
  }
  getList() {
    if(this.productId != null){
      this.productService.getListByPage(1,12, this.productId).subscribe((response: any) => {
        this.productList = response.data.content
      })
    }
    else {
      this.productService.getListByPage(1,12).subscribe((response: any) => {
        this.productList = response.data.content
      })
    }
  }
}
