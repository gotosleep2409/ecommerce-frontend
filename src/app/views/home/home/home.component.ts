import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from "../shared/nav/nav.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {HeaderComponent} from "../shared/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavComponent, FooterComponent, HomePageComponent, HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}