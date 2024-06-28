import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** POST: add a new User to the server */
  addUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/user`;
    return this.http.post<User>(url , user, this.httpOptions).pipe(catchError(this.handleError));
  }

  /** GET: get a user with name and password */
  getUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/user`;
    let params = new HttpParams()
      .set('name', user.name)
      .set('password', user.password);

    return this.http.get<User>(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /** GET: get a user with an id */
  getAnUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/user/${id}`

    return this.http.get<User>(url).pipe(catchError(this.handleError));
  }

  /** POST: add a favorite product */
  addFavoriteProduct(userId: number, productId: number): Observable<User> {
    const url = `${this.apiUrl}/user/${userId}/product/${productId}`;
    return this.http.post<User>(url , {userId, productId}, this.httpOptions).pipe(catchError(this.handleError));
  }

  /** DELETE: delete a favorite product */
  deleteFavoriteProduct(userId: number, productId: number): Observable<User> {
    const url = `${this.apiUrl}/user/${userId}/product/${productId}`;
    return this.http.delete<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  isProductInUser(userId: number, productId: number): Observable<boolean> {
    const url = `${this.apiUrl}/${userId}/product/${productId}/exists`;
    return this.http.get<boolean>(url, this.httpOptions).pipe(catchError(this.handleError));
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
