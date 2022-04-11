import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';
import { Data } from '@angular/router';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Q3 Sales' },
  { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Q4 Sales' }
];

const SAMPLE_BARCHART_LABELS: string[] = [ 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7' ];

class ChartData {
  "key": string;
  "total": number
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.css' ],
})
export class BarChartComponent implements OnInit {

  constructor(private salesDataService: SalesDataService) { }

  orders: any;
  oderLables!: string[];
  orderData!: number[];

  public barChartData: any[] = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  ngOnInit(): void {
    this.salesDataService.getOrders(1, 100)
      .subscribe(res => {
        //console.log(res.page.data);
        const localChartData = this.getChartData(res);
      })
  }
  getChartData(res: any) {
    this.orders = res.page.data;
    const data = this.orders.map((o: { total: number; }) => o.total);
    const labels = this.orders.map(
      (o: { placed: string; }) =>
        moment(new Date(o.placed)).format('YY-MM-DD')
    );

    const formattedOrders = this.orders.reduce(
      (result: any, curr: any) => {
        result.push([ moment(curr.placed).format('YY-MM-DD'), curr.total ]);
        return result;
      }, []);
    //console.log(formattedOrders);
    // result: ['22-03-25', 2549]

    // Necesito un arreglo con los Totales por Fecha


    const totalPorFecha: ChartData[] = [];

    formattedOrders.map((current: any) => {

      // Busco si existe el elemento en el arreglo de resultados: totalPorFecha
      var element = totalPorFecha.find(x => x.key === current[ 0 ]);

      if (element) {
        // Si existe, sumo el total
        element.total += current[ 1 ];
      } else {
        // Si no existe, agrego el elemento al arreglo
        totalPorFecha.push({
          key: current[ 0 ],
          total: current[ 1 ]
        });
      }
    });

    console.log(totalPorFecha);



    // Toma cada valor del arreglo y le aplica la función que le paso,
    // en este caso es una suma.
    // Por lo tanto va sumando cada valor y lo acumula 
    // en la variable sum.
    // const myData = [ 3, 4, 5 ].reduce((sum, value) => {
    //   console.log('sum', sum, 'value', value);
    //   return sum + value;
    // }, 0);
    // console.log('myData', myData);
  }
}