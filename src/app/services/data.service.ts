import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  posicaoAluno: number = 0;
  ra = ""
  idSala = ""
  nomeProfessor = ""


  getRA(): string {
    return this.ra
  }

  setRA(ra: string) {
    this.ra = ra;
  }

  getIdSala(): string {
    return this.idSala
  }

  setIdSala(idSala: string) {
    this.idSala = idSala;
  }

  setNomeProfessor(nomeProfessor: string){
    this.nomeProfessor = nomeProfessor;
  }

  getNomeProfessor(){
    return this.nomeProfessor;
  }


  identificarAluno(ra: String): any {
    var json = {
      ra: ra,
    };

    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/fila/inserir`, json)
      .pipe(
        retry(3),
        map((data) => {
          return data;
        })
      );
  }
  sairFila(ra: String): any {
    var json = {
      ra: ra,
    };

    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/fila/sair`, json)
      .pipe(
        retry(3),
        map((data) => {
          return data;
        })
      );
  }

  chamarProximo(idSala: String): any {
    var json = {
      id_sala: idSala,
    };

    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/fila/chamar-proximo`, json)
      .pipe(
        retry(3),
        map((data) => {
          return data;
        })
      );
  }

  setPosicao(posicao) {
    this.posicaoAluno = posicao;
  }
  getPosicao(): number {
    return this.posicaoAluno;
  }

  quantidadeFila(): any {
    return this.http
      .get<any>(`${environment.teleatendimentoUrl}/fila/quantidade`)
      .pipe(
        retry(3),
        map((data) => {
          return data;
        })
      );
  }

  finalizarAluno(ra): any {
    var json = {
      ra: ra
    };
    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/atendimento/sair-aluno`, json)
      .pipe(
        retry(3)
      );
  }

  finalizarProfessor(ra): any {
    var json = {
      ra: ra
    };
    console.log("Finalizando professor");
    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/atendimento/sair-professor`, json)
      .pipe(
        retry(3)
      );
  }
  
  registrarAtendimento(ra, nomeProfessor): any {
    var json = {
      ra: ra,
      professor: nomeProfessor
    };
    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/atendimento/registrar`, json)
      .pipe(
        retry(3)
      );
  }
  
  buscarHistoricoAluno(ra): any {
    var json = {
      ra: ra,
    };
    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/atendimento/`, json)
      .pipe(
        retry(3)
      );
  }
  
  avaliarAtendimento(avaliacao, comentario): any {
    var json = {
      ra: this.ra,
      avaliacao: avaliacao,
      comentario: comentario
    };
    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/atendimento/avaliar`, json)
      .pipe(
        retry(3)
      );
  }

}

