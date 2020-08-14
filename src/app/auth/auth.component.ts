import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { LoginProtocol } from './login-protocol';

/**
 * The auth component
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  /** The user display name */
  displayName: string;

  /** Login protocols */
  loginProtocols: LoginProtocol[];

  /**
   * Creates a new instance of the auth service
   *
   * @param authService the auth service
   */
  constructor(private authService: AuthService) {}

  /** Initialize values for the component */
  ngOnInit() {
    this.loginProtocols = this.authService.getLoginProtocols();
  }

  /**
   * Login using google
   */
  login(loginProtocol: LoginProtocol): void {
    this.authService
      .login(loginProtocol.provider)
      .then(displayName => {
        this.authService.getCurrentUser().then(user => {
          this.displayName = user.name;
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  /**
   * Sign out
   */
  doSignout(): void {
    this.authService.logout();
    this.displayName = undefined;
  }

  /**
   * Checks if the user is logged in
   *
   * @returns true if logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
