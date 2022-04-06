import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { Order, SAMPLE_ORDERS } from '../../shared/order';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: [ './section-orders.component.css' ]
})
export class SectionOrdersComponent implements OnInit {

  // injecto el servicio en el constructor
  constructor(private salesData: SalesDataService) { }

  // generate mock data for five orders
  orders!: Order[]; // = SAMPLE_ORDERS;
  total!: number;
  page = 1;
  limit = 10;
  loading = false;
  response: any;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.salesData.getOrders(this.page, this.limit)
      .subscribe(res => {
        this.response = res;
        //console.log(this.response);
        this.orders = this.response.page.data;
        this.total = this.response.total;
      });
  }

  goToPrevious() {
    console.log('Previous Page!');
  }

  goToNext() {
    console.log('Next Page!');
  }
}
