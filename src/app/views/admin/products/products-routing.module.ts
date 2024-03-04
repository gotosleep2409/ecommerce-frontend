import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductsActionComponent} from "./products-action/products-action.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'products'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products'
      },
      {
        path: 'list',
        component:ProductsListComponent,
        data: {
          title: 'list'
        }
      },
      {
        path: 'create',
        component: ProductsActionComponent,
        data: {
          title: 'Add new product'
        }
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
