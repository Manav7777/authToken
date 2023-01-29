import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthnticationComponent } from './component/authntication/authntication.component';

const routes: Routes = [
  {path:'authanticate',component:AuthnticationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
