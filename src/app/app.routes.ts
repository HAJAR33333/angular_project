import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DevIndexComponent } from './dev/dev-index.component';
import { DevAuthComponent } from './dev/dev-auth.component';
import { DevProductsComponent } from './dev/dev-products.component';
import { DevProductRatingComponent } from './dev/dev-product-rating.component';
import { AppPlaceholderComponent } from './app-placeholder.component';
import { LoginPageComponent } from './pages/login-page/login-page';  
import { ProductsPageComponent } from './pages/products-page/products-page';
import { ProductRatingPageComponent } from './pages/product-rating-page/product-rating-page';
import { Step1SummaryComponent } from './pages/checkout/step1-summary.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'dev', component: DevIndexComponent },
  { path: 'dev/auth', component: DevAuthComponent },
  { path: 'dev/products', component: DevProductsComponent },
  { path: 'dev/products/:id/rating', component: DevProductRatingComponent },
  { path: 'app', component: AppPlaceholderComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'shop/products', component: ProductsPageComponent },
  { path: 'shop/rating', component: ProductRatingPageComponent },
  { path: 'shop/cart', component: CartPageComponent },
  { path: 'checkout/step1', component: Step1SummaryComponent },
  { path: '**', redirectTo: '' },
];
