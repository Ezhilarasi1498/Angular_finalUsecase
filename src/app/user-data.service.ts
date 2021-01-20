import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { User } from 'src/app/Model/users';
import { Observable,throwError  } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  URL = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    public router: Router
    ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  currentUser = {}; 

  getUser(): Observable<any> {
    return this.http.get<User>(this.URL) 
  }

  createUser(user:User): Observable<User> {
    return this.http.post<User>(this.URL, JSON.stringify(user), this.httpOptions)
    
  }

  signUp(user: User): Observable<any> {
    let api = `${this.URL}`;
    return this.http.post<any>(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }
  signIn(user: User) {
    return this.http.post<any>(`${this.URL}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res.id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['userProfile/' + user.id]);
        })
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  getUserProfile(id): Observable<any> {
    let api = `${this.URL}/userProfile/${id}`;
    return this.http.get(api,  this.httpOptions ).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
