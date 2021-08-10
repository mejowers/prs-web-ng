import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';

const routes: Routes = [
  { path:'', redirectTo: '/user-list', pathMatch:'full'},
  { path:'user-list', component:UserListComponent},
  { path:'user-create', component:UserCreateComponent},
  { path:'user-edit/:id', component:UserEditComponent},
  { path:'user-detail/:id', component:UserDetailComponent},
  { path:'vendor-list', component:VendorListComponent},
  { path:'vendor-create', component:VendorCreateComponent},
  { path:'vendor-edit/:id', component:VendorEditComponent},
  { path:'vendor-detail/:id', component:VendorDetailComponent},
  { path:'**', component:UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
