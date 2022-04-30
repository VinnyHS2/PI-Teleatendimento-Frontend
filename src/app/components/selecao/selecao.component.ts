import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.scss'],
})
export class SelecaoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectProfessor() {
    this.router.navigate(['/login-professor']);
  }
  redirectAluno() {
    this.router.navigate(['/login-aluno']);
  }
}
