import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductItemComponent} from "./product-item/product-item.component";
import {ProductsService} from "../../../../../services/products.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnChanges{
  productList: any = []
  productId: string = null
  @Input() filters: { from: number | null; to: number | null; category: any | null } = { from: null, to: null, category: null }
  searchQuery: string = null

  constructor(private productService: ProductsService,private router: ActivatedRoute) {
    this.router.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || null
      this.getList()
    })
  }

  async ngOnInit() {
    this.router.params.subscribe((params) => {
      if (params && params['categoryId']) {
        this.productId = params['categoryId']
        this.searchQuery = params['search'] || null
      }
      this.getList()
    })

    this.router.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || null
      this.getList()
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']) {
      this.getList()
    }
  }

  getList() {
    const params: any = {
      page: 1,
      size: 12,
      productId: this.productId || null,
      from: this.filters?.from || null,
      to: this.filters?.to || null,
      category: this.filters?.category?.id || null,
      search: this.searchQuery || null
    }

    Object.keys(params).forEach(key => {
      if (params[key] === null) {
        delete params[key]
      }
    })

    this.productService.getListByPageForHomePage(params).subscribe((response: any) => {
      this.productList = response.data.content
    })
  }
}
