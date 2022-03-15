import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from 'src/app/shared/chart.colors';

const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Sentiment Analysis' },
  { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Image Reconctinion' },
  { data: [ 18, 48, 77, 9, 100, 27, 40 ], label: 'Forecasting' }
];
const LINE_CHART_LABELS: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {
  }

  lineChartData: any[] = LINE_CHART_SAMPLE_DATA;
  lineChartLabels: string[] = LINE_CHART_LABELS;
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend: boolean = true;
  lineChartType: string = 'line';
  lineChartColors: any[] = LINE_CHART_COLORS;

}
