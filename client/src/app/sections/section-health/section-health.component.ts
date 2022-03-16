import { Component, OnInit } from '@angular/core';
import { Server, SAMPLE_SERVERS } from '../../shared/server';

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit {

  constructor() { }

  servers: Server[] = SAMPLE_SERVERS;

  ngOnInit(): void {
  }

}
