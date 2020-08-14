import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AuthComponent } from './auth/auth.component';
import { PocketComponent } from './pocket/pocket.component';

/** Application routes */
const routes: Routes = [
  {
    path: 'pocket',
    component: PocketComponent,
    canActivate: [AngularFireAuthGuard]
  }
];

/**
 * The application routing modules
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
