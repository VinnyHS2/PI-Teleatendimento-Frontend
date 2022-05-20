import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teleatendimento-professor',
  templateUrl: './teleatendimento-professor.component.html',
  styleUrls: ['./teleatendimento-professor.component.scss']
})
export class TeleatendimentoProfessorComponent implements OnInit {

  nomeProfessor: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
