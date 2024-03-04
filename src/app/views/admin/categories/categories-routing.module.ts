import {RouterModule, Routes} from "@angular/router";
import {CategoriesListComponent} from "./categories-list/categories-list.component";
import {CategoriesDetailComponent} from "./categories-detail/categories-detail.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'categories'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'categories'
      },
      {
        path: 'list',
        component:CategoriesListComponent,
        data: {
          title: 'list'
        }
      },
      {
        path: 'create',
        component: CategoriesDetailComponent,
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
export class CategoriesRoutingModule {
}
