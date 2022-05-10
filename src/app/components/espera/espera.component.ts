import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.scss'],
})
export class EsperaComponent implements OnInit {
  constructor(
    private socketService: WebSocketService,
    private router: Router,
    private dataService: DataService
    ) {
    this.socketService.onEvent('iniciar').subscribe((data) => {

    });
  }

  ngOnInit(): void {}
  conectar() {
    this.router.navigate(['/atendimento']);
  }
  desconectar() {
    this.dataService.sairFila(Cookies.get("ra")).subscribe();
    this.router.navigate(['/']);
  }
}
