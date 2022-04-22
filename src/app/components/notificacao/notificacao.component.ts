import { not } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { NotificacaoService } from 'src/app/services/notificacao.service';

export type NotificacaoAcao = {
  acao: 'novo' | 'remover' | 'remover-todas',
  notificacao?: Notificacao,
};

export type Notificacao = {
  mensagem: string,
  timing?: number
}

@Component({
  selector: 'app-notificacao',
  styleUrls: ['./notificacao.component.css'],
  templateUrl: './notificacao.component.html',
})
export class NotificacaoComponent {
  notificacao: Notificacao[] = [];

  constructor(private notificacaoService: NotificacaoService) {
    this.notificacaoService.getNotificacao()
      .subscribe((notificacaoAcao: NotificacaoAcao) => {

        switch (notificacaoAcao.acao) {
          case 'novo':
            this.notificacao = this.notificacao.filter(notificacao => {
              return notificacaoAcao.notificacao;
            });
            break;

          case 'remover':
            this.notificacao = this.notificacao.filter(notificacao => {
              return notificacao !== notificacaoAcao.notificacao;
            });
            break;

          default:
            this.notificacao = [];
            break;
        }
      });
  }

  remover(notificacao: Notificacao) {
    this.notificacaoService
      .removerNotificacao(notificacao);
  }
}