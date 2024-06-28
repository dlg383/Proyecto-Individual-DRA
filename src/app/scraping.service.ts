import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IPhone15 } from './scraping';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {

  private apiUrl = 'http://localhost:8080/api/iphone15/data';

  constructor(private http: HttpClient) { }

  getIPhone15Data(): Observable<IPhone15[]> {
    return this.http.get<IPhone15[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
