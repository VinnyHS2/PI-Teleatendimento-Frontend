import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-avaliacao-atendimento',
  templateUrl: './avaliacao-atendimento.component.html',
  styleUrls: ['./avaliacao-atendimento.component.scss']
})
export class AvaliacaoAtendimentoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  avaliar() {
    this.router.navigate(['/'])
  }
}
