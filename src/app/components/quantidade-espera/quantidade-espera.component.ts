import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-quantidade-espera',
  templateUrl: './quantidade-espera.component.html',
  styleUrls: ['./quantidade-espera.component.scss'],
})
export class QuantidadeEsperaComponent implements OnInit {
  quantidadeFila: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.quantidadeFila().subscribe((data) => {
      this.quantidadeFila = data;
    });
  }
}
