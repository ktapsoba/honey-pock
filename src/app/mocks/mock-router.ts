import { NavigationEnd } from '@angular/router';
import { of } from 'rxjs';

export class MockRouter {

  public events = of(new NavigationEnd(0, '', ''));

  navigate(url: string[]) {
    return url;
  }

}
