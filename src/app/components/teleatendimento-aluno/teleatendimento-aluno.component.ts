import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notificacation.service';
import { VideoService } from 'src/app/services/video.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-teleatendimento-aluno',
  templateUrl: './teleatendimento-aluno.component.html',
  styleUrls: ['./teleatendimento-aluno.component.scss']
})
export class TeleatendimentoAlunoComponent implements OnInit {
  eventObs: any;
  aluno: string = " "

  constructor(
    private videoService: VideoService,
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router,
    private socketService: WebSocketService

  ) {
    this.aluno = this.dataService.getRA();
    this.eventObs = this.socketService.onEvent('finalizar-professor').subscribe((data) => {
      this.videoService.hangupAluno();
      this.socketService.disconnect().subscribe();
      this.notificationService.showInfo(
        'O professor finalizou o atendimento.'
      );
      this.router.navigate(['/atendimento/avaliacao']);
    });
  }

  sair(){
    this.videoService.hangupAluno();
    this.socketService.disconnect().subscribe();
    this.dataService.finalizarAluno(this.aluno).subscribe();
    this.router.navigate(['/atendimento/avaliacao']);
  }

  ngOnInit(): void {
    this.videoService.joinSessionAluno(this.dataService.getRA(), this.dataService.getIdSala()).subscribe();
  }

}
