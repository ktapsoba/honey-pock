import { MockAuth } from './mock-auth';
import { Observable, of } from 'rxjs';

export class MockAngularFireAuth {
  auth: MockAuth;
  authState: Observable<any>;
}
