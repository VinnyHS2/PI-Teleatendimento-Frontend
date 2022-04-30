import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-login-professor',
  templateUrl: './page-login-professor.component.html',
  styleUrls: ['./page-login-professor.component.scss']
})
export class PageLoginProfessorComponent implements OnInit {
  form: FormGroup;


  constructor(
    private socketService: WebSocketService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
    )
    {

    this.form = this.formBuilder.group({

          nome: [
            '',
            [
              Validators.required,
            ],
          ],
    });

  }

  ngOnInit(): void {}

  // conectar(nome: string) {
  //   this.socketService.connectSocket().subscribe({
  //     next: (v) => {
  //       this.socketService.createSubscription(nome);
  //     },
  //     error: (e) => {
  //       console.error('!!!!!!!!!!!!!!!!!!!!!!!!!', e);
  //     },
  //     complete: () => {},
  //   });
  //   this.socketService.onEvent(nome).subscribe((data) => {
  //     console.log('>>>>> Recebeu evento', data);
  //   });
  // }

  get fn() {
    return this.form.controls;
  }

  voltar() {
    this.router.navigate(['/']);
  }

  onSubmit(): void {

    if (this.form.invalid) {
      return;
    }
  }
}
