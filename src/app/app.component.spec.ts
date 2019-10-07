import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { NavigationStart, NavigationCancel, NavigationError, NavigationEnd, Router } from '@angular/router';
import { MockRouter } from './mocks/mock-router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MaterialModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'honey-pock'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('honey-pock');
  });

  it('should have loading be false', () => {
    expect(component.loading).toBeFalsy();
  });

  it('should set loading to true when receiving a navigation start event', () => {
    const event = new NavigationStart(0, '');
    component.checkRouterEvent(event);
    expect(component.loading).toBeTruthy();
  });

  it('should set loading to false when receiving a navigation end event', () => {
    component.loading = true;
    const event = new NavigationEnd(0, '', '');
    component.checkRouterEvent(event);
    expect(component.loading).toBeFalsy();
  });

  it('should set loading to false when receiving a navigation cancel event', () => {
    component.loading = true;
    const event = new NavigationCancel(0, '', '');
    component.checkRouterEvent(event);
    expect(component.loading).toBeFalsy();
  });

  it('should set loading to false when receiving a navigation error event', () => {
    component.loading = true;
    const event = new NavigationError(0, '', '');
    component.checkRouterEvent(event);
    expect(component.loading).toBeFalsy();
  });

});

describe('AppTemplate', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MaterialModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    const htmlElement = fixture.debugElement.nativeElement;
    expect(htmlElement.querySelector('.content span').textContent).toContain('honey-pock app is running!');
  });

  it('should not show progress bar at startup', () => {
    const htmlElement = fixture.debugElement.nativeElement;
    expect(htmlElement.querySelector('.mat-progress-bar')).toBeFalsy();
  });

  it('should show progress bar when receiving navigation start event', () => {
    const event = new NavigationStart(0, '');
    component.checkRouterEvent(event);
    fixture.detectChanges();
    const htmlElement = fixture.debugElement.nativeElement;
    expect(htmlElement.querySelector('.mat-progress-bar')).toBeTruthy();
  });

  it('should hide progress bar when receiving navigation end event', () => {
    component.loading = true;
    fixture.detectChanges();
    const event = new NavigationEnd(0, '', '');
    component.checkRouterEvent(event);
    fixture.detectChanges();
    const htmlElement = fixture.debugElement.nativeElement;
    expect(htmlElement.querySelector('.mat-progress-bar')).toBeFalsy();
  });

  it('should hide progress bar when receiving navigation cancel event', () => {
    component.loading = true;
    fixture.detectChanges();
    const event = new NavigationCancel(0, '', '');
    component.checkRouterEvent(event);
    fixture.detectChanges();
    const htmlElement = fixture.debugElement.nativeElement;
    expect(htmlElement.querySelector('.mat-progress-bar')).toBeFalsy();
  });

  it('should hide progress bar when receiving navigation error event', () => {
    component.loading = true;
    fixture.detectChanges();
    const event = new NavigationError(0, '', '');
    component.checkRouterEvent(event);
    fixture.detectChanges();
    const htmlElement = fixture.debugElement.nativeElement;
    expect(htmlElement.querySelector('.mat-progress-bar')).toBeFalsy();
  });

});
