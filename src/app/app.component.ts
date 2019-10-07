import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

/**
 * The application component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  /** The application title */
  title = 'honey-pock';

  /** Show is the page is loading or not */
  loading = false;

  /**
   * Creates a new instance of the app component
   *
   * @param router the application router
   */
  constructor(private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.checkRouterEvent(event);
    });
  }

  /**
   * Displays the progress bar depending on the router event
   *
   * @param routerEvent the router event
   */
  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd
      || routerEvent instanceof NavigationCancel
      || routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }
}
