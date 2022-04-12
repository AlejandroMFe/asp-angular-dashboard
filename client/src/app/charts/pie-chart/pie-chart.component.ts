import { Component, Input, OnInit } from '@angular/core';
import { THEME_COLORS } from 'src/app/shared/theme.colors';

const theme = "Default";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: [ './pie-chart.component.css' ]
})
export class PieChartComponent implements OnInit {

  constructor() { }

  // Datos que recibo del componente padre
  @Input() inputData: any;
  @Input() limit!: number;

  // Sample data for component
  public pieChartData!: number[];// = [ 350, 450, 120 ];
  public pieChartLabels!: string[];// = [ 'Ale Dev Soft', 'Software Company', 'Acme Hosting' ];
  colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      //backgroundColor: [ "#26547c", "#ff6b6b", "#ffd166" ],
      borderColor: "#111"
    }
  ];

  public pieChartType: string = 'doughnut';

  ngOnInit(): void {
    // trabajar con la info que recibo del componente padre
    this.parseChartData(this.inputData, this.limit);
  }

  parseChartData(data: any, limit: number) {

    const limitedData = data.slice(0, limit);

    // check if the data is from ByCustomer or ByState
    if (limitedData[ 0 ].hasOwnProperty('name')) {
      //console.log("es Customer");
      this.pieChartLabels = limitedData.map((item: { name: any; }) => item.name)
    } else {
      //console.log("es State");
      this.pieChartLabels = limitedData.map((item: { state: any; }) => item.state)
    }

    // total
    this.pieChartData = limitedData.map((item: { total: any; }) => item.total)
  }

  themeColors(themeName: string) {
    const themeColors = THEME_COLORS.slice(0)
      .find(item => item.name === themeName)?.colorSet;
    //console.log(themeColors);
    return themeColors;
  }
}
