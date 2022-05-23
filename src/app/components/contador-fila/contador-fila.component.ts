import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contador-fila',
  templateUrl: './contador-fila.component.html',
  styleUrls: ['./contador-fila.component.scss']
})
export class ContadorFilaComponent implements OnInit {

  posicaoFila: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.posicaoFila = this.dataService.getPosicao();
  }

}
