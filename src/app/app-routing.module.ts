import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';

const routes: Routes = [
  { path:'', redirectTo: '/movie-list', pathMatch:'full'},
  { path:'user-list', component:UserListComponent},
  // { path:'user-create', component:UserCreateComponent},
  // { path:'user-edit/:id', component:UserEditComponent},
  // { path:'user-detail/:id', component:UserDetailComponent},
  { path:'**', component:UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
