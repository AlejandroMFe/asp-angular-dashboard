import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from 'src/app/shared/chart.colors';
import { SalesDataService } from 'src/app/services/sales-data.service';

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

  topCustomers !: string[];
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
      //console.log("data: ", this.allOrders);

      // get 3 top customers
      this.salesDataService.getOrderByCustomer(3).subscribe(res => {
        this.topCustomers = res.map((c: { [ x: string ]: any; }) => c[ 'name' ]);

        // get the order for each customer
        var result = this.topCustomers.map(customer => {
          return {
            name: customer,
            data: {
              total: this.allOrders.filter(o => o[ 'customer' ].name === customer)
                .map(o => o[ 'total' ]),
              placed: this.allOrders.filter(o => o[ 'customer' ].name === customer)
                .map(o => o[ 'placed' ])
            }
          }
        });
        //console.log(result);

        // format data
        this.lineChartData = result.map(o => {
          return {
            data: o.data.total,
            label: o.name
          }
        });
        //console.log(lineChartData);        

        this.lineChartLabels = this.allOrders.map(o => o[ 'placed' ]);
        //console.log(lineChartLabels);
        //const LINE_CHART_LABELS: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ];

      });
    });
  }
}
