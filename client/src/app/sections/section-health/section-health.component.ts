import { Component, OnInit } from '@angular/core';
import { Server, SAMPLE_SERVERS } from '../../shared/server';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: [ './section-health.component.css' ]
})
export class SectionHealthComponent implements OnInit {

  constructor(private serverService: ServerService) { }

  servers: Server[] = SAMPLE_SERVERS;

  ngOnInit(): void {
    this.serverService.getServers().subscribe(
      res => {
        console.log(res);

      }
    );
  }

}
