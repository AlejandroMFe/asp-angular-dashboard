import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Order } from '../shared/order';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {

  constructor(private http: HttpClient) { }

  getOrders(page: number, limit: number) {
    return this.http.get<any>('https://localhost:7167/Order/' + page + '/' + limit);
  }

  getOrderByState() {
    return this.http.get<any>('https://localhost:7167/Order/ByState');
  }

  getOrderById(id: number) {
    return this.http.get<any>('https://localhost:7167/Order/' + id);
  }

  getOrderByCustomer(id: number) {
    return this.http.get<any>('https://localhost:7167/Order/ByCustomer/' + id);
  }
}