import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notificacation.service';
import { VideoService } from 'src/app/services/video.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-teleatendimento-professor',
  templateUrl: './teleatendimento-professor.component.html',
  styleUrls: ['./teleatendimento-professor.component.scss'],
})
export class TeleatendimentoProfessorComponent implements OnInit {
  professor: string = ' ';
  aluno: string = ' ';
  eventObs: any;
  teste: boolean = true;
  constructor(
    private videoService: VideoService,
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router,
    private socketService: WebSocketService
  ) {
    this.professor = this.dataService.getNomeProfessor();
    this.eventObs = this.socketService
      .onEvent('finalizar-aluno')
      .subscribe((data) => {
        this.videoService.hangup();
        this.socketService.cancelSubscription(this.aluno);
        this.notificationService.showInfo('O aluno finalizou o atendimento.');
      });
  }
  chamarProximo(): void {
    let nameRoom = uuid.v4();

    this.videoService.joinSession(this.professor, nameRoom).subscribe({
      next: (data) => {
        this.dataService.chamarProximo(nameRoom).subscribe({
          next: (data) => {
            this.socketService.createSubscription(data.ra);
            this.aluno = data.ra;
            this.dataService.registrarAtendimento(data.ra, this.professor).subscribe();
          },
          error: (error) => {
            this.notificationService.showError(
              error.error.error_message.message
            );
            this.videoService.hangup();
          },
        });
      },
      error: (error) => {
        this.notificationService.showError(error.error.error_message.message);
      },
    });
  }

  sair() {
    this.router.navigate(['/']);
  }

  encerrarAtendimento() {
    this.videoService.hangup();
    this.socketService.cancelSubscription(this.aluno);
    this.dataService.finalizarProfessor(this.aluno).subscribe();
  }

  ngOnInit(): void {}
}
