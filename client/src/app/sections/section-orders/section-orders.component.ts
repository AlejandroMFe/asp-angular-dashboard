import { Component, OnInit, Input } from '@angular/core';
import { Order, SAMPLE_ORDERS } from '../../shared/order';


@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: [ './section-orders.component.css' ]
})
export class SectionOrdersComponent implements OnInit {


  constructor() { }

  // generate mock data for five orders
  orders: Order[] = SAMPLE_ORDERS

  ngOnInit(): void {
  }

  goToPrevious() {
    console.log('go to previous page');
  }
}
