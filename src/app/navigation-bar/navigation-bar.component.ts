import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SesionService } from '../sesion.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  sesion: number | undefined;
  private sesionSubscription: Subscription | undefined;

  constructor(public sesionService: SesionService){
    this.sesion = sesionService.sesion;
  }

  ngOnInit() {
    this.getSesion();
  }

  getSesion(){
    this.sesionSubscription = this.sesionService.sesion$.subscribe(
      (sesion) => {
        this.sesion = sesion;
      }
    );
  }

  logOut(){
    window.location.href = 'http://localhost:4200/'
  }
}
