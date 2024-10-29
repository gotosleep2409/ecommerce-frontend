import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CategoriesListComponent} from "../categories/categories-list/categories-list.component";
import {CategoriesDetailComponent} from "../categories/categories-detail/categories-detail.component";
import {DiscountCodeListComponent} from "./discount-code-list/discount-code-list.component";
import {DiscountCodeDetailComponent} from "./discount-code-detail/discount-code-detail.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'discountCode'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'discountCode'
      },
      {
        path: 'list',
        component:DiscountCodeListComponent,
        data: {
          title: 'list'
        }
      },
      {
        path: 'create',
        component: DiscountCodeDetailComponent,
        data: {
          title: 'Detail'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountCodeRoutingModule {
}
