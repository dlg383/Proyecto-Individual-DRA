import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { User } from '../user';
import { Subscription } from 'rxjs';
import { SesionService } from '../sesion.service';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent {
  products: Product[] = [];
  user: User | undefined;
  favorite: string = '/assets/img/favorite.png';
  sesion: number | undefined;
  private sesionSubscription: Subscription | undefined;

  constructor(public sesionService: SesionService, private userService: UserService, private productService: ProductService){
    this.sesion = sesionService.sesion;
  }

  ngOnInit(): void {
    this.getSesion();
    this.getUser();
    this.getProducts();
  }

  getSesion(){
    this.sesionSubscription = this.sesionService.sesion$.subscribe(
      (sesion) => {
        this.sesion = sesion;
      }
    );
  }

  getUser(){
    if(this.sesion != -1){
      const id: number = this.sesion ?? -1;
      this.userService.getAnUser(id).subscribe(
        user => {
          this.user = user;
        }
      );
    }
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        if (Array.isArray(products)) {
          // Filtrar solo los productos que son favoritos del usuario
          this.products = products.filter(product => this.isFavorite(product.id));
          this.products.sort((a, b) => a.id - b.id);
        } else {
          console.error('Products data is not an array:', products);
        }
      });
  }

  isFavorite(apiId: number): boolean{
    if (!this.user) {
      return false;
    }
    return this.user.products.some(product => product.apiId === apiId);
  }

}
