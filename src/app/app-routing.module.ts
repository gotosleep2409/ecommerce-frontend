import { NgModule } from '@angular/core';
import {provideRouter, RouterModule, Routes, withHashLocation} from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import {HomeComponent} from "./views/home/home/home.component";
import {PrimaryPageComponent} from "./views/home/primary-page/primary-page.component";
import {PageProductDetailComponent} from "./views/home/home/page-product-detail/page-product-detail.component";
import {HomePageComponent} from "./views/home/home/home-page/home-page.component";
import {CheckOutComponent} from "./views/home/check-out/check-out.component";
import {PaymentResultComponent} from "./views/home/payment-result/payment-result/payment-result.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./views/admin/categories/categories-routing.module').then((m) => m.CategoriesRoutingModule)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./views/admin/products/products-routing.module').then((m) => m.ProductsRoutingModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/admin/users/users-routing.module').then((m) => m.UsersRoutingModule)
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./views/admin/orders/orders-routing.module').then((m) => m.OrdersRoutingModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: 'product',
    component: HomeComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'all',
        loadChildren: () =>
          import('./views/home/home/home-page/home-page-routing.module').then((m) => m.HomePageRoutingModule)
      },
      {
        path: 'detail',
        loadChildren: () =>
          import('./views/home/home/page-product-detail/page-product-detail-routing.module').then((m) => m.PageProductDetailRoutingModule)
      },
      {
        path: ':categoryId',
        loadChildren: () =>
          import('./views/home/home/product-category/product-category-routing.module').then((m) => m.ProductCategoryRoutingModule)
      },
    ]
  },
  {
    path: 'home',
    component: PrimaryPageComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
    data: {
      title: 'checkout'
    }
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'paymentSuccess',
    component: PaymentResultComponent,
    data: {
      title: 'Payment Result'
    }
  },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      useHash: false
      // relativeLinkResolution: 'legacy'
    })
  ],
  /*providers: [
    provideRouter(routes, withHashLocation()),
  ],*/
  exports: [RouterModule]
})
export class AppRoutingModule {
}
