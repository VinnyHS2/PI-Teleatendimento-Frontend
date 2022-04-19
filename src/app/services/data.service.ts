import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  identificarAluno(ra: String): any {
    var json = {
      ra: ra
    }

    return this.http
      .post<any>(`${environment.teleatendimentoUrl}/fila/inserir`, json)
      .pipe(
        retry(3),
        map((data) => {
          return data;
        })
      )

  }

}

