import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { ROUTES } from 'src/app/core/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly logo = '../../../assets/images/icon-512x512.png';

  constructor(public auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.router.navigate([`${ROUTES.CHAT}`]);
      })
      .catch((e) => console.log(e));
  }
}
