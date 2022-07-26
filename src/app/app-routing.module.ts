import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmPageComponent } from './film-page/film-page.component';
import { FilmsComponent } from './films/films.component';
import { IsAuthGuard } from './is-auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'films', component: FilmsComponent, pathMatch: 'full' , canActivate: [IsAuthGuard]},
  { path: 'films/:id', component: FilmPageComponent, canActivate: [IsAuthGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
