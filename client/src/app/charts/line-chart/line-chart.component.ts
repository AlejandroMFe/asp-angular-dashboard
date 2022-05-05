import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from 'src/app/shared/chart.colors';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { formatDate } from '@angular/common';

const LINE_CHART_LABELS: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ];
const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Sentiment Analysis' },
  { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Image Reconctinion' },
  { data: [ 18, 48, 77, 9, 100, 27, 40 ], label: 'Forecasting' }
];

type LineDataChart = {
  data: number[];
  label: string;
};

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
  lineChartType: any = 'line';
  lineChartColors: any[] = LINE_CHART_COLORS;

  ngOnInit(): void {
    this.salesDataService.getOrders(1, 100).subscribe(res => {

      // this const have the data for line chart graphic
      const output: LineDataChart[] = [];
      const dates: string[] = [];

      // get all orders
      const ordersData: any[] = res.page.data;

      // format dates
      ordersData.forEach(order => {
        order.placed = formatDate(order.placed, 'yyyy-MM-dd', 'en-US');
      });
      // console.log(ordersData);

      // get top 3 customers
      this.salesDataService.getOrderByCustomer(4).subscribe(res => {

        this.topCustomers = res;
        this.topCustomers.shift(); // remove first element, is duplicate
        const customers = this.topCustomers;

        // Orders by each one of top customers
        type Data = { customer: string; date: string; total: number; };
        let temp: Data[] = [];

        // get the orders data for each one of top customers
        customers.forEach(customer => {
          ordersData.forEach(order => {
            if (customer.name === order.customer.name) {
              let obj = {
                customer: order.customer.name,
                date: order.placed,
                total: order.total
              };
              //console.log(order.customer.name);
              temp.push(obj);
            }
          });
        });

        // sort by customer and date
        temp.sort((a, b) => {
          if (a.customer > b.customer) {
            return 1;
          }
          if (a.customer < b.customer) {
            return -1;
          }
          if (a.date > b.date) {
            return 1;
          }
          if (a.date < b.date) {
            return -1;
          }
          return 0;
        });
        //console.log(temp);

        // total orders by customer and date
        let orders: Data[] = [];
        let customer: string = temp[ 0 ].customer;
        let date: string = temp[ 0 ].date;
        let total: number = 0;

        temp.forEach(order => {
          if (customer === order.customer && date === order.date) {
            total += order.total;
          } else {
            let obj = {
              customer: customer,
              date: date,
              total: total
            };
            orders.push(obj);
            customer = order.customer;
            date = order.date;
            total = order.total;
          }
        });
        let obj = {
          customer: customer,
          date: date,
          total: total
        };
        orders.push(obj);
        //console.log("orders", orders);

        // get all dates from sum

        orders.forEach(order => {
          if (!dates.includes(order.date)) {
            dates.push(order.date);
          }
        });
        dates.sort();
        //console.log("dates", dates);

        // Necesito recorrer todas las fechas dentro de dates
        // recorrer los clientes top customer
        // y por cada cliente guardar el total para esa fecha
        // si no tiene fechas completar con cero
        customers.forEach(x => {
          let obj = {
            "label": x.name,
            "data": getSalesForDate(x.name, orders, dates)
          }
          output.push(obj);
        })


        // Pass data to lineChartData
        this.lineChartLabels = dates;
        this.lineChartData = output;
      });
    });
  }
}

function getSalesForDate(cutomer: any, orders: { customer: string; date: string; total: number; }[], dates: string[]) {
  let ventas: number[] = [];

  // para un customer
  // obtener las ventas para cada fecha
  // si no tuvo ventas retornar 0
  dates.forEach(date => {
    let venta = 0;

    // busca en todas las orders si tiene ventas esa fecha
    orders.forEach(order => {
      if (order.customer === cutomer && order.date === date) {
        venta = order.total;
      }
    }
    );
    ventas.push(venta);
  }
  );
  return ventas;
}