import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { Subscription } from 'rxjs';
import { SesionService } from '../sesion.service';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{
  @Input() product: Product | undefined;
  user: User | undefined;
  favorite: string = '/assets/img/favorite.png';
  sesion: number | undefined;
  private sesionSubscription: Subscription | undefined;

  constructor(public sesionService: SesionService, private userService: UserService){
    this.sesion = sesionService.sesion;
  }

  ngOnInit(): void {
    this.getSesion();
    this.getUser();
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

  isFavorite(): boolean{
    if (!this.user) {
      return false;
    }
    return this.user.products.some(product => product.apiId === this.product?.id);
  }
}
