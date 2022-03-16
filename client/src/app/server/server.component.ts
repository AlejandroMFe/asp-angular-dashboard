import { Component, OnInit, Input } from '@angular/core';
import { Server } from "../shared/server";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }

  @Input()
  serverInput!: Server;

  color!: string; 
  btnText!: string;
  message!: string;
  
  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);  
  }

  setServerStatus(isOnline: boolean): void{
    if (isOnline) {
      this.serverInput.isOnline = isOnline;
      this.message = isOnline? 'online 🎉' : 'offline 🤪';
      this.color = '#66BB6A'; // verde
      this.btnText = 'Shut Down';
    } else {
      this.serverInput.isOnline = isOnline;
      this.message = isOnline? 'online 🟢' : 'offline 🤪';
      this.color = '#FF5252'; // rojo      
      this.btnText = 'Start';
    }
  }


  toggleStatus(status:boolean): void{
    console.log(this.serverInput.name);
    this.setServerStatus(!status);
  }
  
}
