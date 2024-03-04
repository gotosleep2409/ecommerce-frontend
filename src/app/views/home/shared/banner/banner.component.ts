import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CarouselCaptionComponent,
  CarouselComponent, CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from "@coreui/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, CarouselItemComponent, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselCaptionComponent, CarouselControlComponent, RouterLink],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit{
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  ngOnInit() {
    this.slides[0] = {
      id: 0,
      src: './assets/img/slide_1_img.jpg',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: './assets/img/slide_2_img.jpg',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    this.slides[2] = {
      id: 2,
      src: './assets/img/slide_4_img.jpg',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }
  }
}
