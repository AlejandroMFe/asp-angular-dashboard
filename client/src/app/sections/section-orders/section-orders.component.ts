import { Component, OnInit } from '@angular/core';
import { Order, SAMPLE_ORDERS } from '../../shared/order';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: [ './section-orders.component.css' ]
})
export class SectionOrdersComponent implements OnInit {

  // injecto el servicio en el constructor
  constructor() { }

  // generate mock data for five orders
  orders: Order[] = SAMPLE_ORDERS;

  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit(): void {
    //this.getOrders();
  }

  getOrders(): void {
    // this.salesData.getOrders(this.page, this.limit)
    //   .subscribe(res => {
    //     console.log("Result from getOrders:", res);
    //     // this.orders = res['page'][ 'data' ];
    //     // this.total = res['page'].total;
    //     // this.loading = false;
    //   })
  }

  goToPrevious() {
    console.log('Previous Page!');
  }

  goToNext() {
    console.log('Next Page!');
  }
}
