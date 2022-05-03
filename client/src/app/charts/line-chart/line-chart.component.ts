import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from 'src/app/shared/chart.colors';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { formatDate } from '@angular/common';
import { top } from '@popperjs/core';

const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Sentiment Analysis' },
  { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Image Reconctinion' },
  { data: [ 18, 48, 77, 9, 100, 27, 40 ], label: 'Forecasting' }
];
const LINE_CHART_LABELS: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: [ './line-chart.component.css' ]
})
export class LineChartComponent implements OnInit {

  constructor(private salesDataService: SalesDataService) { }

  topCustomers !: any[];
  allOrders !: any[];
  lineChartData!: any[];// = LINE_CHART_SAMPLE_DATA;
  lineChartLabels!: string[];// = LINE_CHART_LABELS;
  lineChartOptions: any = { responsive: true };
  lineChartLegend: boolean = true;
  lineChartType: string = 'line';
  lineChartColors: any[] = LINE_CHART_COLORS;

  ngOnInit(): void {

    this.salesDataService.getOrders(1, 100).subscribe(res => {

      // get all orders
      this.allOrders = res.page.data;

      // format date for placed
      this.allOrders.forEach(order => {
        order.placed = formatDate(order.placed, "dd-MM-yyyy", "en-US");
      });
      console.log(this.allOrders[0].customer.name);

      // get top customers
      this.salesDataService.getOrderByCustomer(4).subscribe(res => {
        this.topCustomers = res;
        console.log(this.topCustomers[ 1 ].name);
        console.log(this.topCustomers[ 2 ].name);
        console.log(this.topCustomers[ 3 ].name);


      });
    });
  }
}
