import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthnticationComponent } from './components/authntication/authntication.component';
import { LoaderComponent } from './components/common/loader/loader.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'authanticate',component:AuthnticationComponent},
  {path:'home',component:HomeComponent},
  {path:'loader',component:LoaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
