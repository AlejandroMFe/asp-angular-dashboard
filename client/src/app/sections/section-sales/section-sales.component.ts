import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: [ './section-sales.component.css' ]
})
export class SectionSalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByState: any;
  limitByState = 5;
  limitByCustomer = 3;

  constructor(private salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this.salesDataService.getOrderByState().subscribe(res => {
      this.salesDataByState = res;
      //console.log("ByState:", res);
    });

    this.salesDataService.getOrderByCustomer(this.limitByCustomer).subscribe(res => {
      this.salesDataByCustomer = res;
      //console.log("ByCustomer:", res);
    });
  }

}
