import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServerMessage } from '../shared/server-message';
import { Server } from "../shared/server";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: [ './server.component.css' ]
})
export class ServerComponent implements OnInit {

  constructor() { }

  @Input() serverInput!: Server;
  @Output() serverAction = new EventEmitter<ServerMessage>();

  color!: string;
  btnText!: string;
  message!: string;
  serverStatus !: string;
  isLoading !: boolean;

  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);
  }

  setServerStatus(isOnline: boolean): void {
    if (isOnline) {
      this.serverInput.isOnline = isOnline;
      this.serverStatus = 'Online 🤩';
      this.color = '#66BB6A'; // verde
      this.btnText = 'Shut Down';
    } else {
      this.serverInput.isOnline = isOnline;
      this.serverStatus = 'Offline 😫'
      this.color = '#FF5252'; // rojo      
      this.btnText = 'Start';
    }
  }

  sendServerAction(isOnline: boolean) {
    console.log('sendServerAction activated!');    
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage {
    var newPayload!: string;

    if (isOnline) {
      //return {
      //id: this.serverInput.id,
      newPayload = 'offline';
      //};
    } else {
      //   return {
      //     id: this.serverInput.id,
      newPayload = 'online'
      //};
    }
    return {
      id: this.serverInput.id,
      payload: newPayload
    }
  }

  makeLoading() {
    this.color = '#FFF176'; // amarillo
    this.btnText = 'loading...';
    this.isLoading = true;
    this.serverStatus = 'Loading';
  }

  // toggleStatus(status:boolean): void{
  //   //console.log(this.serverInput.name);
  //   this.setServerStatus(!status);
  // }

}
