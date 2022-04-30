import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-aluno',
  templateUrl: './login-aluno.component.html',
  styleUrls: ['./login-aluno.component.scss'],
})
export class LoginAlunoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private socketService: WebSocketService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      ra: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }

  ngOnInit(): void {}

  conectar(ra: string) {
    this.socketService.connectSocket().subscribe({
      next: (v) => {
        this.socketService.createSubscription(ra);
      },
      error: (e) => {
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!', e);
      },
      complete: () => {},
    });
    this.socketService.onEvent(ra).subscribe((data) => {
      console.log('>>>>> Recebeu evento', data);
    });
  }

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

    this.dataService.identificarAluno(this.fn['ra'].value).subscribe(
      (data) => {
        this.conectar(this.fn['ra'].value);
        this.router.navigate([`espera`]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
