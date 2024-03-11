import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "../shared/nav/nav.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {CustomerInfoComponent} from "./customer-info/customer-info.component";
import {CartInfoComponent} from "./cart-info/cart-info.component";

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent, CustomerInfoComponent, CartInfoComponent],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent {

}
