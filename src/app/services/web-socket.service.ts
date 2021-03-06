import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subject, Subscription } from 'rxjs';
import { EventSocket } from '../models/event.model';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  //Observable com todos os eventos recebidos
  private observable = new Subject<EventSocket<any>>();
  private stompClient;

  private _webSocketConnected = new BehaviorSubject<boolean>(false);
  private _webSocketConnectedObs = this._webSocketConnected.asObservable();

  private subscriptions = new Map<string, Subscription>();

  private connected = false;

  private topicWaintingToSubscription: Array<string> = new Array();

  constructor() {}

  getWebSocketConnectedObs(): Observable<boolean> {
    return this._webSocketConnectedObs;
  }
  setWebSocketConnected(connected: boolean = false): void {
    this._webSocketConnected.next(connected);
  }

  connectSocket(): Observable<boolean> {
    const token = '';
    // const token = Cookies.get(AuthService.ATTR_TOKEN);
    console.log(this.stompClient);
    if (this.stompClient) {
      return new Observable((observable) => {
        this.connected = true;
        observable.next(true);
        observable.complete();
      });
    }

    const ws = new SockJS(`${environment.teleatendimentoUrl}/pi-websocket`);

    return new Observable((observable) => {
      this.stompClient = Stomp.over(ws);

      this.stompClient.connect(
        {
          Authorization: ``,
        },
        async () => {
          this.connected = true;
          // console.log('>>>>> Conectou websocket');
          // this.subscriptions.forEach((value, key) => {
          // this.createSubscription("bit");
          // this.topicWaintingToSubscription.forEach((key) => {
          // });

          this.setWebSocketConnected(true);
          observable.next(true);
          observable.complete();
        },
        (error) => {
          console.error('Erro ao conectar no socket', error);
          this.disconnect().subscribe({
            next: (v) => {},
            error: (e) => {
              console.error('Erro ao desconetar socket', e);
            },
            complete: () => {},
          });

          this.setWebSocketConnected(false);

          // setTimeout(() => {
          //   this.connectSocket().subscribe();
          // }, 2000);
        }
      );
    });
  }

  public createSubscription(topic: string) {
    topic = `/${topic}`;
    if (!this.connected) {
      // console.log(
      //   `!!!! Socket nao conetado, salvando topico para ser conectado ${topic}`
      // );
      // if (!this.subscriptions.has(topic)) {
      this.topicWaintingToSubscription.push(topic);
      // }

      return;
    }

    if (
      topic === undefined ||
      topic === 'undefined' ||
      topic === '/undefined'
    ) {
      return;
    }

    let observableForThisSubscription = new Subject<any>();

    //Se o topico n??o est?? ativo ele ?? ativado.
    if (!this.subscriptions.has(topic)) {
      // console.log( `------> N??o possui topico no map ${topic}`, this.connected );
      // this.subscriptions.set(topic, null);

      if (this.connected) {
        let subscription = this.stompClient.subscribe(topic, (event) => {
          let socketEvent: EventSocket<any> = JSON.parse(event.body);
          this.observable.next(socketEvent);
          observableForThisSubscription.next(socketEvent);
        });
        // console.log('Socket: Inscrito topico: ' + topic)
        this.subscriptions.set(topic, subscription);
      }
    }

    return observableForThisSubscription;
  }

  public cancelSubscription(topic: string): void {
    topic = `/${topic}`;

    if (this.subscriptions.has(topic)) {
        this.subscriptions.get(topic)!.unsubscribe();

      this.subscriptions.delete(topic);
    }

    // this.persisteTopics();
  }

  public disconnect(): Observable<boolean> {
    return new Observable((observable) => {
      //Remove todos os topicos ativos
      [...this.subscriptions.values()].forEach((sub: Subscription) => {
        sub.unsubscribe();
      });
      this.subscriptions = new Map();

      if (this.stompClient?.connected) {
        this.stompClient.disconnect();
      }

      this.stompClient = undefined;
      this.connected = false;
      observable.next(true);
      observable.complete();
    });
  }

  anyEvent = <T>(): Observable<Object> => {
    return this.observable.pipe(
      map((event: EventSocket<T>) => {
        return event;
      })
    );
  };

  byTopic = <T>(topico: string): Observable<Object> => {
    return this.observable.pipe(
      filter((event: EventSocket<T>) => event.topico === topico),
      map((event: EventSocket<T>) => {
        return event;
      })
    );
  };
  onEvent = <T>(tipo: String): Observable<Object> => {
    return this.observable.pipe(
      filter(
        (event: EventSocket<T>) =>
          event.tipo.toString() === (tipo)
      ),
      map((event: EventSocket<T>) => {
        return event.payload;
      })
    );
  };
}
