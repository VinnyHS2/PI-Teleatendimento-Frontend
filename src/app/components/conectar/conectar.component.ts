import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-conectar',
  templateUrl: './conectar.component.html',
  styleUrls: ['./conectar.component.scss'],
})
export class ConectarComponent implements OnInit {

  constructor(public socketService: WebSocketService) {}

  ngOnInit(): void {}
  
  conectar() {
    this.socketService.connectSocket();
  }

}
