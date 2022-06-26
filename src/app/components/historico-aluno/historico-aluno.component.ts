import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-historico-aluno',
  templateUrl: './historico-aluno.component.html',
  styleUrls: ['./historico-aluno.component.scss']
})
export class HistoricoAlunoComponent implements OnInit {

  @Input() 
  ra: String;
  // 'ra',

  headerTable = [
    'professor',
    'avaliacao',
    'comentario',
  ];

  historico: Array<any>;

  constructor( private dataService: DataService ) { }

  ngOnInit(): void {

    this.dataService.buscarHistoricoAluno(this.ra).subscribe(
      (data) => {

        this.historico = data.historico;

        console.log(this.historico);
      }
    );

  }

}
