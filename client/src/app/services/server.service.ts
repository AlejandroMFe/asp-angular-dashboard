import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Server } from '../shared/server';
import { ServerMessage } from '../shared/server-message';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {

    // generate headers for the request
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

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

  ServerMessage(message: ServerMessage): Observable<Response> {

    const url = "https://localhost:7167/Server/" + message.id;
    return this.http.put<Response>(url, message, { headers: this.headers });
  }
}
