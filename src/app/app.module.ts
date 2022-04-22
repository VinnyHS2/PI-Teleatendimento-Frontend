import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConectarComponent } from './components/conectar/conectar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageLoginAlunoComponent } from './pages/page-login-aluno/page-login-aluno.component';
import { PageLoginProfessorComponent } from './pages/page-login-professor/page-login-professor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EsperaComponent } from './pages/espera/espera.component';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { SelecaoComponent } from './pages/selecao/selecao.component';



@NgModule({
  declarations: [
    AppComponent,
    ConectarComponent,
    PageLoginAlunoComponent,
    PageLoginProfessorComponent,
    NotFoundComponent,
    EsperaComponent,
    NotificacaoComponent,
    SelecaoComponent
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
