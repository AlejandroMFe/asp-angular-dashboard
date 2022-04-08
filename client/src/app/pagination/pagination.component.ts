import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.css' ]
})
export class PaginationComponent implements OnInit {

  @Input() page!: number;
  @Input() count!: number;
  @Input() perPage!: number;
  @Input() pagesToShow!: number;
  @Input() loading!: boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
    
  }

  onPrev(): void {
    this.goPrev.emit(true);
  }

  onNext(): void {
    this.goNext.emit(true);
  }

  onPage(num: number) {
    this.goPage.emit(num);
  }

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }

  isLastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }

  getPages(): number[] {
    //console.log("count " + this.count, "perPage " + this.perPage, "this.page " + this.page);
    
    const totalPages = Math.ceil(this.count / this.perPage);
    const thisPage = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(thisPage); // agrego la pagina actual
    
    // acá va construyendo la cajita con las paginas 
    // que se van a  mostrar
    console.log('Starting loop with:\n\ttotalPages:', totalPages, '\n\tthisPage:', thisPage, '\n\tpagesToShow:', pagesToShow);
    for (let i = 0; i < pagesToShow - 1; i++) {
     console.log('pages[]: ', pages);
      

      if (pages.length < pagesToShow) {
        // como el nro de página es > 1 voy restando
        // hasta completar la cajita de páginas
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
          console.log('pushing -1', Math.min.apply(null, pages) - 1, 'onto array');
        }
      }


      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < totalPages) {

          // al nro de página más grande le sumo 1
          pages.push(Math.max.apply(null, pages) + 1);
          console.log('pushing +1', Math.max.apply(null, pages) + 1, 'onto array');
        }
      }
    }
    pages.sort((a, b) => a - b); // ordena de menor a mayor
    return pages;
  }
}
