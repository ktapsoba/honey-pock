import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AuthService } from './auth/auth.service';
import { PocketComponent } from './pocket/pocket.component';
import { PocketDetailComponent } from './pocket/pocket-detail/pocket-detail.component';
import { PocketService } from './pocket/pocket.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PocketComponent,
    PocketDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [PocketDetailComponent],
  providers: [AuthService, AngularFireAuthGuard, PocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
