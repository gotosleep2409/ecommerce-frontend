import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardBodyComponent, CardComponent, CardGroupComponent} from "@coreui/angular";
import {CategoriesService} from "../../../../services/categories.service";

@Component({
  selector: 'app-card-categories',
  standalone: true,
  imports: [CommonModule, CardGroupComponent, CardComponent, CardBodyComponent],
  templateUrl: './card-categories.component.html',
  styleUrl: './card-categories.component.scss'
})
export class CardCategoriesComponent implements OnInit{
  @Input() categoryItem: any;
  constructor( ) {
  }
  ngOnInit() {
  }


}
