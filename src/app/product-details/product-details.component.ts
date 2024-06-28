import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { SesionService } from '../sesion.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  user: User | undefined;
  product: Product | undefined;
  sesion: number | undefined;
  private sesionSubscription: Subscription | undefined;
  favorite: string = '/assets/img/favorite.png';
  noFavorite: string = '/assets/img/noFavorite.png';
  isFavorite: boolean = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, public sesionService: SesionService, private userService: UserService){
    this.sesion = sesionService.sesion;
  }

  ngOnInit(): void {
    this.getSesion();
    forkJoin({
      user: this.getUser(),
      product: this.getProduct()
    }).subscribe(({ user, product }) => {
      this.user = user;
      this.product = product;
      this.isFavorite = this.productIsFavorite();
      console.log(this.isFavorite);
    });
  }
 
  getProduct() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if(!this.user){
      this.productService.getProduct(id)
      .subscribe(product => this.product = product);
    }
    return this.productService.getProduct(id);
  }

  getSesion(){
    this.sesionSubscription = this.sesionService.sesion$.subscribe(
      (sesion) => {
        this.sesion = sesion;
      }
    );
  }

  getUser(){
    if (this.sesion != -1) {
      const id: number = this.sesion ?? -1;
      return this.userService.getAnUser(id);
    }
    return new Observable<User | undefined>((observer) => observer.next(undefined));
  }

  productIsFavorite(): boolean {
    if (!this.user || !this.product) {
      return false;
    }
    return this.user.products.some((product) => product.apiId === this.product!.id);
  }

  addFavorite(){
    if(this.sesion != -1){
      const id: number = this.sesion ?? -1;
      const productId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
      this.userService.addFavoriteProduct(id, productId).subscribe(
        response => {
          console.log('Producto añadido con éxito', response);
          this.isFavorite = true;
        },
        error => {
          console.error('Error al añadir producto', error);
        }
      );
    }
  }

  deleteFavorite(){
    const id: number = this.sesion ?? -1;
    const productId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.userService.deleteFavoriteProduct(id, productId)
      .subscribe(
        response => {
          console.log('Producto eliminado correctamente', response);
          this.isFavorite = false;
        },
        error => {
          console.error('Error al eliminar producto', error);
        }
      );
  }
}
