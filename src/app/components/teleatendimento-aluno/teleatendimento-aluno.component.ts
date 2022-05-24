import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-teleatendimento-aluno',
  templateUrl: './teleatendimento-aluno.component.html',
  styleUrls: ['./teleatendimento-aluno.component.scss']
})
export class TeleatendimentoAlunoComponent implements OnInit {

  constructor(
    private videoService: VideoService,
    private dataService: DataService,
    private router: Router
  ) {
  }
  
  aluno: string = " "
  
  sair(){
    this.router.navigate(['/']);
  }
  
  ngOnInit(): void {
    this.videoService.joinSessionAluno(this.dataService.getRA(), this.dataService.getIdSala()).subscribe();
  }

}
