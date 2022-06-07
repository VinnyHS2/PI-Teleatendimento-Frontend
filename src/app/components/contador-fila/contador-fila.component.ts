import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-contador-fila',
  templateUrl: './contador-fila.component.html',
  styleUrls: ['./contador-fila.component.scss'],
})
export class ContadorFilaComponent implements OnInit {
  @Input() isProfessor!: boolean;
  posicaoFila: number = 0;

  constructor(
    private dataService: DataService,
    private socketService: WebSocketService
  ) { }

  ngOnInit(): void {
    console.log("entrou",this.isProfessor)
    if (this.isProfessor) {
      this.dataService.quantidadeFila().subscribe({
        next: (data) => {
          this.posicaoFila = data.quantidade;
        },
      });
      this.socketService.onEvent('quantidade').subscribe((data) => {
        this.dataService.quantidadeFila().subscribe({
          next: (data) => {
            this.posicaoFila = data.quantidade;
          },
        });
      });
    } else {
      this.posicaoFila = this.dataService.getPosicao();
      this.socketService.onEvent('chamar').subscribe((data) => {
        this.posicaoFila -= 1;
      });
      this.socketService.onEvent('sair').subscribe((data) => {
        if ((data as number) < this.posicaoFila) {
          this.posicaoFila -= 1;
        }
      });
    }
  }
}
