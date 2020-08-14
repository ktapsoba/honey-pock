import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Pocket } from './pocket.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Observable } from 'rxjs';
import { debounceTime, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PocketService {
  private pocketCollection: AngularFirestoreCollection<Pocket>;
  pockets: Observable<Pocket[]>;

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.pocketCollection = angularFirestore
      .collection('users')
      .doc(this.authService.user.id)
      .collection('pockets');
    this.pockets = this.pocketCollection.valueChanges();
  }

  createPocket(pocket: Pocket) {
    return this.pocketCollection.add(pocket);
  }

  getPocketByName(name: string) {
    return this.angularFirestore
      .collection('users')
      .doc(this.authService.user.id)
      .collection('pocket', ref => {
        return ref.where('name', '==', name);
      });
  }
}
