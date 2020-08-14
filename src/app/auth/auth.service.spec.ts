import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MockAngularFireAuth } from '../mocks/mock-angular-fire-auth';
import { Router } from '@angular/router';
import { MockRouter } from '../mocks/mock-router';
import { MockAuth } from '../mocks/mock-auth';
import { User } from './user.model';
import { auth } from 'firebase';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockAngularFireAuth: MockAngularFireAuth;
  let mockAuth: MockAuth;
  const testUser: User = new User('123', 'Test user');
  const provider = new auth.GoogleAuthProvider();

  beforeEach(async () => {
    mockAuth = new MockAuth();
    mockAngularFireAuth = new MockAngularFireAuth();
    mockAngularFireAuth.auth = mockAuth;
    mockAngularFireAuth.authState = of({
      uid: '123',
      displayName: 'Test user'
    });
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: Router, useClass: MockRouter },
        AuthService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with expected user info back', fakeAsync(() => {
    spyOn(mockAuth, 'signInWithPopup').and.returnValue(
      Promise.resolve({
        user: {
          uid: '222',
          displayName: 'Test Test'
        }
      })
    );

    service.login(provider);
    tick();
    const user: User = service.user;
    expect(user).not.toBeNull();
    expect(user.id).toBe('222');
    expect(user.name).toBe('Test Test');
  }));

  it(`should log error when there's an error during login`, fakeAsync(() => {
    spyOn(mockAuth, 'signInWithPopup').and.returnValue(
      Promise.reject('error login')
    );
    spyOn(console, 'error');
    service.login(provider);
    tick();
    console.log(service.user);
    expect(service.user).toBeUndefined();
    expect(console.error).toHaveBeenCalled();
  }));

  it('should logout user', fakeAsync(() => {
    spyOn(mockAuth, 'signOut').and.returnValue(Promise.resolve(undefined));
    service.user = testUser;
    service.logout();
    tick();
    expect(service.user).toBeNull();
  }));

  it('should log error when theres and error during logout', fakeAsync(() => {
    spyOn(mockAuth, 'signOut').and.returnValue(
      Promise.reject('Failed to logout')
    );
    spyOn(console, 'error');
    service.logout();
    tick();
    expect(console.error).toHaveBeenCalled();
  }));

  it('should return true when user is authenticated', () => {
    service.user = testUser;
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false when user is not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
