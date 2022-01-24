import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CHAT } from './core/models';
import { ROUTES } from './core/routes/routes';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.CHAT,
    pathMatch: 'full',
  },
  {
    path: ROUTES.CHAT,
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: ROUTES.HOME,
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
