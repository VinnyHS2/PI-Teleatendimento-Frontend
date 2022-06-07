import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.component.html',
  styleUrls: ['./login-professor.component.scss'],
})
export class LoginProfessorComponent implements OnInit {
  form: FormGroup;

  constructor(
    private socketService: WebSocketService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  conectar() {
    this.socketService.connectSocket().subscribe({
      next: (v) => {
        this.socketService.createSubscription("fila");
      },
      error: (e) => {
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!', e);
      },
      complete: () => {},
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
    this.conectar();
    this.dataService.setNomeProfessor(this.fn['nome'].value);
    this.router.navigate(['/atendimento/professor'])

  }
}

