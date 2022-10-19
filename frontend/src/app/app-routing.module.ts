import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockNotTokenGuard } from './guards/block-not-token.guard';
import { CheckLoginGuard } from './guards/check-login.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [CheckLoginGuard] },
  {path: 'home', component: HomeComponent, canActivate: [BlockNotTokenGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [BlockNotTokenGuard] },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
