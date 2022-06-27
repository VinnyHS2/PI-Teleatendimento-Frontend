import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-avaliacao-atendimento',
  templateUrl: './avaliacao-atendimento.component.html',
  styleUrls: ['./avaliacao-atendimento.component.scss']
})
export class AvaliacaoAtendimentoComponent implements OnInit {

  ra: String;

  descricao = new FormControl('');
  avaliacao = 0;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  avaliar() {
    this.dataService.avaliarAtendimento(this.avaliacao, this.descricao.value).subscribe();
    this.router.navigate(['/'])
  }
}
