import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectarComponent } from './components/conectar/conectar.component';
import { PageLoginAlunoComponent } from './pages/page-login-aluno/page-login-aluno.component';  

const routes: Routes = [
  {
    path: '',
    component: ConectarComponent,
  },
  {
    path: 'loginAluno' , component: PageLoginAlunoComponent
  },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
