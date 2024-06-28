import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product, ProductApi } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProduct = 'https://fakestoreapi.com';
  private apiUrl = 'http://localhost:8080/api';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

   /** GET: get products */
   getProducts(): Observable<Product[]> {
    const url = `${this.apiProduct}/products`;
    
    return this.http.get<Product[]>(url).pipe(catchError(this.handleError));
  }

  /** GET: get products */
  getProduct(id: number): Observable<Product> {
    const url = `${this.apiProduct}/products/${id}`;
    
    return this.http.get<Product>(url).pipe(catchError(this.handleError));
  }

  /** POST: add a new Product to the server */
  addUser(produt: ProductApi): Observable<ProductApi> {
    const url = `${this.apiUrl}/product`;
    return this.http.post<ProductApi>(url , produt, this.httpOptions).pipe(catchError(this.handleError));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param error - the error response object
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 404 && typeof error.error === 'string') {
        errorMessage = error.error;
      } else {
        errorMessage = `Server-side error: ${error.status} ${error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
