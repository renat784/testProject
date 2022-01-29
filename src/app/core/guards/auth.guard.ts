import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ROUTES } from '../routes/routes';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AngularFireAuth, private router: Router) {}

  async canActivate(): Promise<boolean> {
    let user = await firstValueFrom(this.auth.user);
    if (!user) {
      this.router.navigate([`${ROUTES.LOGIN}`]);
      return false;
    }
    return true;
  }
}
