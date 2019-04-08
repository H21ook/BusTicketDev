import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/user.model';
import { Facebook } from '@ionic-native/facebook/ngx';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth,
    private facebook: Facebook
    ) { }

  login(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .auth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  register(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  logOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  
  resetPassword(emailAddress): Promise<any> {
    return new Promise((resolve, reject) => {
		this.afAuth.auth.sendPasswordResetEmail(emailAddress).then((data) => {
		  resolve(data);
		}, error => {
		  reject(error);
		});
    });
  }
  
  verificationEmail(): Promise<any> {
    return new Promise((resolve, reject) => {
		var user = this.afAuth.auth.currentUser;
		user.sendEmailVerification().then((data) => {
		  resolve(data);
		}, error => {
		  reject(error);
		});
    });
  }
  
  deleteUser(): Promise<any> {
    return new Promise((resolve, reject) => {
		var user = this.afAuth.auth.currentUser;
		user.delete().then((data) => {
		  resolve(data);
		}, error => {
		  reject(error);
		});
    });
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
  
        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => { 
            console.log("Firebase success: " + JSON.stringify(success)); 
          });
  
      }).catch((error) => { console.log(error) });
  }
}
