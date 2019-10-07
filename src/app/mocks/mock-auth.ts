import { of } from 'rxjs';

export class MockAuth {

  signInWithPopup() {
    return Promise.resolve(
      {
        user: {
          uid: '1111',
          displayName: 'Test'
        }
      }
    );
  }

  signOut() {
    return Promise.resolve(null);
  }
}
