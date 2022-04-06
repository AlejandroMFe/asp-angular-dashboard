import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableInput, pipe } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Server } from '../shared/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>('https://localhost:7167/Server')
      .pipe(
        retry(3), // reintentar 3 veces la peticion
        catchError(this.handleError) // manejar el error
      )
  }

  handleError(error: any): ObservableInput<any> {
    console.log("Hey algo esta mal!");

    const erroeMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.log(erroeMsg);
    throw new Error(erroeMsg);
  }
}
