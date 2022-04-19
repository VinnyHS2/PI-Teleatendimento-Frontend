import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectarComponent } from './components/conectar/conectar.component';
import { PageLoginAlunoComponent } from './pages/page-login-aluno/page-login-aluno.component';  
import { PageLoginProfessorComponent } from './pages/page-login-professor/page-login-professor.component';

const routes: Routes = [
  {
    path: '',
    component: ConectarComponent,
  },
  {
    path: 'loginAluno' , component: PageLoginAlunoComponent
  }, 
  {
    path: 'loginProfessor' , component: PageLoginProfessorComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
