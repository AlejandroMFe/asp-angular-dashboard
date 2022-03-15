import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: [ './pie-chart.component.css' ]
})
export class PieChartComponent implements OnInit {

  constructor() { }

  // Sample data for component
  public pieChartData: number[] = [ 350, 450, 120 ];
  public pieChartLabels: string[] = [ 'Ale Dev Soft', 'Software Company', 'Acme Hosting' ];
  colors: any[] = [
    {
      backgroundColor: [ "#26547c", "#ff6b6b", "#ffd166" ],
      borderColor: "#111"
    }
  ];

  public pieChartType: string = 'doughnut';

  ngOnInit(): void {
  }

}
