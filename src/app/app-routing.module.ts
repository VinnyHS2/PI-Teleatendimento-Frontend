import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectarComponent } from './components/conectar/conectar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EsperaComponent } from './pages/espera/espera.component';
import { PageLoginAlunoComponent } from './pages/page-login-aluno/page-login-aluno.component';
import { PageLoginProfessorComponent } from './pages/page-login-professor/page-login-professor.component';

const routes: Routes = [
  { path: '', component: ConectarComponent, pathMatch: 'full' },
  { path: 'login-aluno', component: PageLoginAlunoComponent },
  { path: 'login-professor', component: PageLoginProfessorComponent },
  { path: 'espera', component: EsperaComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
