import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import Cookies from 'js-cookie';
import { bootstrap } from 'bootstrap';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-espera',
  templateUrl: './espera.component.html',
  styleUrls: ['./espera.component.scss'],
})
export class EsperaComponent implements OnInit {
  eventObs: any;
  constructor(
    private socketService: WebSocketService,
    private router: Router,
    private dataService: DataService
    ) {
      this.eventObs = this.socketService.onEvent('iniciar').subscribe((data) => {
        var myModal = new Modal(document.getElementById('exampleModal'));
        this.dataService.setIdSala(data as string);
        myModal.show();
    });
  }

  ngOnInit(): void {}
  conectar() {
    this.eventObs.unsubscribe();
    var myModal = new Modal(document.getElementById('exampleModal'));
    myModal.hide();
    this.router.navigate(['/atendimento/aluno']);
  }
  desconectar() {
    this.eventObs.unsubscribe();
    var myModal = new Modal(document.getElementById('exampleModal'));
    myModal.hide();
    this.dataService.sairFila(Cookies.get('ra')).subscribe();
    this.dataService.finalizarAluno(Cookies.get('ra')).subscribe();
    this.router.navigate(['/']);
  }
}
