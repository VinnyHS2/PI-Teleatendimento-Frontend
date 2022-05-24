import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notificacation.service';
import { VideoService } from 'src/app/services/video.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-teleatendimento-professor',
  templateUrl: './teleatendimento-professor.component.html',
  styleUrls: ['./teleatendimento-professor.component.scss']
})
export class TeleatendimentoProfessorComponent implements OnInit {
  professor: string = " "
  aluno: string = " "

  constructor(
    private videoService: VideoService,
    private dataService: DataService,
    private notificationService: NotificationService,
    private router: Router
  ) { 
  this.professor = this.dataService.getNomeProfessor();
    }
  chamarProximo(): void {

    let nameRoom = uuid.v4();

    this.videoService
      .joinSession(this.professor, nameRoom)
      .subscribe({
        next: (data) => {
          this.dataService.chamarProximo(nameRoom).subscribe({
             error: (error) => {
             this.notificationService.showError(error.error.error_message.message)
             this.videoService.hangup();
             }
            });
        },
        error: (error) => {
          this.notificationService.showError(' Erro ao chamar o próximo ');
        }
      })
  }

  sair(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
