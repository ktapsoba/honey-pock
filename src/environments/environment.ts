// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/**
 * Sets up the environment variables
 */
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBBPGZDYQbckpXSmiex-ey4MD8_z2JBT_I',
    authDomain: 'honey-pock.firebaseapp.com',
    databaseURL: 'https://honey-pock.firebaseio.com',
    projectId: 'honey-pock',
    appId: '1:1036392889788:web:617f4845105ff7b3223fb9'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
