import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { Notificacao, NotificacaoAcao } from 'src/app/components/notificacao/notificacao.component';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
    notificacao = new Subject<NotificacaoAcao>();

    getNotificacao(): Observable<NotificacaoAcao> {
        return this.notificacao.asObservable();
    }

    notificar(mensagem: string,
              timing?: number) {

        const objNotificacao: Notificacao = {
            mensagem,
            timing,
        };

        this.notificacao.next({
            acao: 'novo',
            notificacao: objNotificacao,
        });

        if (objNotificacao.timing) {
            // Multiplicamos os segundos por 1000
            // para obter milisegundos:
            timer(objNotificacao.timing * 1000)
                .subscribe(() => {
                    this.removerNotificacao(objNotificacao);
                });
        }
    }

    removerNotificacao(notificacao: Notificacao) {
        this.notificacao.next({
            acao: 'remover',
            notificacao
        });
    }

    removerNotificacoes() {
        this.notificacao.next({
            acao: 'remover-todas',
        });
    }
}