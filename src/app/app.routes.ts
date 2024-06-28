import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { ScrapingComponent } from './scraping/scraping.component';

export const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'login', component: LogInComponent },
    { path: 'my-products', component: MyProductsComponent },
    { path: 'scraping', component: ScrapingComponent }
];
