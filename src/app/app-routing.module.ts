import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { ROUTES } from './core/routes/routes';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.CHAT,
    pathMatch: 'full',
  },
  {
    path: ROUTES.CHAT,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/chat/chat.module').then((m) => m.ChatModule),
  },

  {
    path: ROUTES.LOGIN,
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
