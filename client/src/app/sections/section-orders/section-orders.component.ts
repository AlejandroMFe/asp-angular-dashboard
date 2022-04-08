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
  total !: number;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.salesData.getOrders(this.page, this.limit)
      .subscribe(res => {
        this.orders = res.page.data;
        this.total = res.page.total;
        console.log(res);
        
        this.loading = false;
      });
  }

  goToPrevious() {
    //console.log('Previous Page!');
    this.page--;
    this.getOrders();
  }

  goToNext() {
    //console.log('Next Page!');
    this.page++;
    this.getOrders();
  }

  goToPage(num: number) {
    this.page = num;
    this.getOrders();
  }
}
