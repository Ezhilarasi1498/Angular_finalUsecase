import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { AccountDetails } from 'src/app/Model/accountDetail';
import { Observable,throwError  } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  URL = 'http://localhost:4000/accounts';

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAccountProfile(id): Observable<any> {
    let api = `${this.URL}/userProfile/${id}`;
    return this.http.get(api,  this.httpOptions ).pipe(
      map((res: Response) => {
        return res || {}
      }),
      
    )
  }
}
