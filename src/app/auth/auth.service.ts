import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { User } from './user.model';
import { LoginProtocol } from './login-protocol';
import { Observable } from 'rxjs';

/**
 * The auth service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** The user object */
  user: User;
  private authState: Observable<firebase.User>;

  /** The list of login protocols */
  private loginProtocols: LoginProtocol[] = [];

  /**
   * Creates a new instance of the auth service
   *
   * @param angularFireAuth the angular fire auth component
   * @param router the router
   */
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.authState = angularFireAuth.authState;
    this.authState.subscribe(currentUser => {
      if (currentUser) {
        this.user = new User(currentUser.uid, currentUser.displayName);
      } else {
        this.user = null;
      }
    });
    this.intializeLoginProtocols();
  }

  /** Initializes the different login protocols supported by the application */
  private intializeLoginProtocols() {
    const googleProvider = new auth.GoogleAuthProvider();
    googleProvider.addScope('profile');
    googleProvider.addScope('email');
    this.loginProtocols.push(new LoginProtocol('Google', googleProvider));
  }

  /**
   * Gets the login protocols
   *
   * @returns list of login protocols
   */
  getLoginProtocols(): LoginProtocol[] {
    return this.loginProtocols;
  }

  /**
   * Login using google auth service
   *
   * @returns the user name
   */
  login(provider: auth.AuthProvider): Promise<string> {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.signInWithPopup(provider).then(
        result => {
          this.user = new User(result.user.uid, result.user.displayName);
          console.log(this.user.name);
          resolve(this.user.name);
          this.router.navigate(['pocket']);
        },
        error => {
          this.handleError(error);
        }
      );
    });
  }

  /**
   * Log out of the application
   */
  logout(): void {
    this.angularFireAuth.auth
      .signOut()
      .then(() => {
        this.user = null;
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  /**
   * Checks if the user is authenticated
   *
   * @returns true if authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    return this.user != null;
  }

  /**
   * Handles error from the service calls
   *
   * @param err The error
   */
  handleError(err: any): void {
    console.error(err);
  }

  getCurrentUser() {
    return new Promise<User>((resolve, reject) => {
      this.angularFireAuth.auth.onAuthStateChanged(returnedUser => {
        if (returnedUser) {
          resolve(new User(returnedUser.uid, returnedUser.displayName));
        } else {
          reject(null);
        }
      });
    });
  }
}
