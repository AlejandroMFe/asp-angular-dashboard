import { Component, OnInit, OnDestroy } from '@angular/core';
import { Server, SAMPLE_SERVERS } from '../../shared/server';
import { ServerService } from 'src/app/services/server.service';
import { timer, Subscription } from 'rxjs';
import { ServerMessage } from 'src/app/shared/server-message';

@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: [ './section-health.component.css' ]
})
export class SectionHealthComponent implements OnInit, OnDestroy {

  constructor(private serverService: ServerService) { }

  servers!: Server[];// = SAMPLE_SERVERS;
  timerSubscription!: Subscription;

  ngOnInit(): void {
    this.refreshData();
  }
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  refreshData() {
    this.serverService.getServers().subscribe(
      res => {
        this.servers = res;
      });

    this.subscribeToData();
  }
  subscribeToData() {
    this.timerSubscription = timer(5000).subscribe(() => this.refreshData());
  }
  sendMessage(message: ServerMessage) {
    this.serverService.ServerMessage(message).subscribe(
      res => {
        console.log("From section-helth");
        console.log("\tMessage sent to server: ", message);
      }
    );
  }
}