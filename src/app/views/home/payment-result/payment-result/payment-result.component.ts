import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BannerComponent} from "../../shared/banner/banner.component";
import {NavComponent} from "../../shared/nav/nav.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {BillService} from "../../../../services/bill.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule, BannerComponent, NavComponent, FooterComponent],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.scss'
})
export class PaymentResultComponent implements OnInit{
  currentDate: any
  billInfo: any
  constructor(private cookieService: CookieService) {
  }

  ngOnInit() {
    this.currentDate = new Date()
    if(this.cookieService.get("cartInfo")){
      this.billInfo = JSON.parse(this.cookieService.get("cartInfo"))
      this.cookieService.delete("cartInfo")
    }
  }
}
