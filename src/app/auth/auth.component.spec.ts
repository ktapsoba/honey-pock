import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { auth } from 'firebase';
import { LoginProtocol } from './login-protocol';

const displayName = 'Test User';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: any;
  const loginProtocol: LoginProtocol = new LoginProtocol('TestProtocol', new auth.GoogleAuthProvider());

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['getLoginProtocols', 'login', 'isAuthenticated', 'logout']);
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [BrowserAnimationsModule, MaterialModule],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the auth component', () => {
    expect(component).toBeTruthy();
  });

  it('should have list of login protocols', () => {
    authService.getLoginProtocols.and.returnValue([loginProtocol]);
    component.ngOnInit();
    const componentLoginProtocols = component.loginProtocols;
    expect(componentLoginProtocols.length).toEqual(1);
    expect(componentLoginProtocols[0].name).toEqual(loginProtocol.name);
    expect(componentLoginProtocols[0].provider).toEqual(loginProtocol.provider);
  });

  it('display name should be undefined', () => {
    expect(component.displayName).toBeUndefined();
  });

  it('should get display name after successful login', fakeAsync(() => {
    authService.login.and.returnValue(Promise.resolve(displayName));
    component.login(loginProtocol);
    tick();
    expect(component.displayName).toBe(displayName);
  }));

  it('display name should be undefined after unsuccessful login', fakeAsync(() => {
    authService.login.and.returnValue(Promise.reject('error'));
    component.login(loginProtocol);
    tick();
    expect(component.displayName).toBeUndefined();
  }));

  it('display name should be undefined after logout', () => {
    component.displayName = displayName;
    component.doSignout();
    expect(component.displayName).toBeUndefined();
  });

  it('should be true when when user is not logged in', () => {
    expect(component.isLoggedIn()).toBeFalsy();
  });

  it('should be false when user is logged in', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(component.isLoggedIn()).toBeTruthy();
  });

});

describe('AuthTemplate', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: any;
  let signinButton: DebugElement;
  const loginProtocol: LoginProtocol = new LoginProtocol('TestProtocol', new auth.GoogleAuthProvider());

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['getLoginProtocols', 'login', 'isAuthenticated', 'logout']);
    authService.getLoginProtocols.and.returnValue([loginProtocol]);
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [BrowserAnimationsModule, MaterialModule],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    signinButton = fixture.debugElement.query(By.css('.signin'));
  });

  it('should show the sign in button before login', () => {
    const authElement: HTMLElement = fixture.nativeElement;
    expect(authElement.textContent).toContain('Sign in');
  });

  it('shoulg show Login protocol option for signin', () => {
    signinButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    const signinOption = fixture.debugElement.query(By.css('.loginProtocol'));
    expect(signinOption).toBeTruthy();
    expect(signinOption.nativeElement.textContent).toContain(loginProtocol.name);
  });

  it(`should should welcome ${displayName} when signin`, () => {
    authService.isAuthenticated.and.returnValue(true);
    component.displayName = displayName;
    fixture.detectChanges();
    const welcomeElement = fixture.debugElement.query(By.css('.welcomeName'));
    expect(welcomeElement).toBeTruthy();
    expect(welcomeElement.nativeElement.textContent).toContain(`Welcome ${displayName}`);
  });

  it('should show Signout option when logged in and clicking on user name', () => {
    authService.isAuthenticated.and.returnValue(true);
    component.displayName = displayName;
    fixture.detectChanges();
    const welcomeElement = fixture.debugElement.query(By.css('.welcomeName'));
    welcomeElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    const signoutOption = fixture.debugElement.query(By.css('.signout'));
    expect(signoutOption).toBeTruthy();
    expect(signoutOption.nativeElement.textContent).toContain('Sign out');
  });

});
