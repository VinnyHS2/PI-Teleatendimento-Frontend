import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-login-aluno',
  templateUrl: './page-login-aluno.component.html',
  styleUrls: ['./page-login-aluno.component.scss']
})
export class PageLoginAlunoComponent implements OnInit {
  form: FormGroup;


  constructor(
    public socketService: WebSocketService,
    private formBuilder: FormBuilder,
    )
    {

    this.form = this.formBuilder.group({

          ra: [
            '',
            [
              Validators.required,
              Validators.pattern('[0-9]*'),
            ],
          ],
    });

  }

  ngOnInit(): void {}

  conectar() {
    this.socketService.connectSocket().subscribe({
      next: (v) => {
        this.socketService.createSubscription('bit');
      },
      error: (e) => {
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!', e);
      },
      complete: () => {},
    });
    this.socketService.onEvent('bit').subscribe((data) => {
      console.log('>>>>> Recebeu evento', data);
    });
  }

  get fn() {
    return this.form.controls;
  }
}
