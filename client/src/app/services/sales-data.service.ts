import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
//import 'rxjs/add/operator/map'


@Injectable()
export class SalesDataService {

    constructor(private http: HttpClient) { }

    getOrders(pageIndex: number, pageSize: number) {
        return this.http.get('https://localhost:7167/Order/' + pageIndex + '/' + pageSize);
    }

    getOrdersByCustomer(num: number) {
        return this.http.get('https://localhost:7167/Order/bycustomer/' + num);
    }

    getOrdersByState() {
        return this.http.get('https://localhost:7167/Order/bystate');
    }
}