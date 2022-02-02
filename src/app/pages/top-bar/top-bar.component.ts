import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  readonly logo = '../../../assets/images/icon-512x512.png';

  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  logout(): void {
    this.auth.signOut();
    this.router.navigate([`${ROUTES.LOGIN}`]);
  }
}
