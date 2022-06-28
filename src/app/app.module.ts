import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConectarComponent } from './components/conectar/conectar.component';
import { ContadorFilaComponent } from './components/contador-fila/contador-fila.component';
import { EsperaComponent } from './components/espera/espera.component';
import { LoginAlunoComponent } from './components/login-aluno/login-aluno.component';
import { LoginProfessorComponent } from './components/login-professor/login-professor.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { QuantidadeEsperaComponent } from './components/quantidade-espera/quantidade-espera.component';
import { SelecaoComponent } from './components/selecao/selecao.component';
import { TeleatendimentoAlunoComponent } from './components/teleatendimento-aluno/teleatendimento-aluno.component';
import { TeleatendimentoProfessorComponent } from './components/teleatendimento-professor/teleatendimento-professor.component';
import { PageMainLayoutComponent } from './layouts/page-main-layout/page-main-layout.component';
import { TeleatendimentoLayoutComponent } from './layouts/teleatendimento-layout/teleatendimento-layout.component';
import { AvaliacaoAtendimentoComponent } from './components/avaliacao-atendimento/avaliacao-atendimento.component';
import { HistoricoAlunoComponent } from './components/historico-aluno/historico-aluno.component';
import { MatTableModule } from '@angular/material/table';
import { SidebarModule } from 'ng-sidebar';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    ConectarComponent,
    NotFoundComponent,
    EsperaComponent,
    SelecaoComponent,
    PageMainLayoutComponent,
    LoginAlunoComponent,
    LoginProfessorComponent,
    TeleatendimentoLayoutComponent,
    TeleatendimentoProfessorComponent,
    TeleatendimentoAlunoComponent,
    ContadorFilaComponent,
    QuantidadeEsperaComponent,
    AvaliacaoAtendimentoComponent,
    HistoricoAlunoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    SidebarModule.forRoot(),
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
