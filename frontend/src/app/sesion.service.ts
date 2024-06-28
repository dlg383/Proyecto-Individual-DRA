import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private sesionSubject = new BehaviorSubject<number | undefined>(-1);
  sesion$ = this.sesionSubject.asObservable();

  get sesion(): number | undefined {
    return this.sesionSubject.value;
  }

  set sesion(value: number | undefined) {
    this.sesionSubject.next(value);
  }
}
