import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { map } from 'rxjs/operators'
import { auth } from 'firebase/app'

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  registesUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  loginGoogleUser() { }
  loginFacebookUser() { }
  logoutUser() { }

  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

}
