import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  // @Input() page: number =2;
  // @Input() count: number = 3;
  // @Input() perPage: number = 1;
  // @Input() pagesToShow: number = 5;
  // @Input() loading = true;

  @Output() goPrev = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }
}
