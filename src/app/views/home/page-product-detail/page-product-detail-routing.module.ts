import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PageProductDetailComponent} from "./page-product-detail.component";

const routes: Routes = [
  {
    path: 'abc',
    data: {
      title: 'products'
    },
    children: [
      {
        path: 'detail',
        component: PageProductDetailComponent,
        data: {
          title: 'Product Detail'
        }
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageProductDetailRoutingModule {
}
