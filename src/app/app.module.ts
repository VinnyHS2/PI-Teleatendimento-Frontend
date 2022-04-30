import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConectarComponent } from './components/conectar/conectar.component';
import { LoginAlunoComponent } from './components/login-aluno/login-aluno.component';
import { LoginProfessorComponent } from './components/login-professor/login-professor.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { PageMainLayoutComponent } from './layouts/page-main-layout/page-main-layout.component';
import { EsperaComponent } from './components/espera/espera.component';
import { SelecaoComponent } from './components/selecao/selecao.component';






@NgModule({
  declarations: [
    AppComponent,
    ConectarComponent,
    NotFoundComponent,
    EsperaComponent,
    NotificacaoComponent,
    SelecaoComponent,
    PageMainLayoutComponent,
    LoginAlunoComponent,
    LoginProfessorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
