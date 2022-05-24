import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAlunoComponent } from './components/login-aluno/login-aluno.component';
import { LoginProfessorComponent } from './components/login-professor/login-professor.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PageMainLayoutComponent } from './layouts/page-main-layout/page-main-layout.component';
import { EsperaComponent } from './components/espera/espera.component';
import { SelecaoComponent } from './components/selecao/selecao.component';
import { TeleatendimentoLayoutComponent } from './layouts/teleatendimento-layout/teleatendimento-layout.component';
import { TeleatendimentoProfessorComponent } from './components/teleatendimento-professor/teleatendimento-professor.component';
import { TeleatendimentoAlunoComponent } from './components/teleatendimento-aluno/teleatendimento-aluno.component';

const routes: Routes = [
  { path: '', component: PageMainLayoutComponent, 
    children: [
      { path: '', component: SelecaoComponent }, 
      { path: 'login-aluno', component: LoginAlunoComponent },
      { path: 'login-professor', component: LoginProfessorComponent },
      { path: 'espera', component: EsperaComponent },
    ],
  },
    {
      path: 'atendimento', component: TeleatendimentoLayoutComponent,
      children:[
        {path: 'professor', component: TeleatendimentoProfessorComponent },
        {path: 'aluno', component: TeleatendimentoAlunoComponent},
      ],
    },
    { path: '**', component: NotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
