import { Component, OnInit } from '@angular/core';

const SAMPLE_BARCHART_DATA: any[] = [
  { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Q3 Sales' },
  { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Q4 Sales' }
];

const SAMPLE_BARCHART_LABELS: string[] = [ 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7' ];

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  constructor() {}

  public barChartData: any[] = SAMPLE_BARCHART_DATA;
  public barChartLabels: string[] = SAMPLE_BARCHART_LABELS;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  ngOnInit(): void {

  }
}