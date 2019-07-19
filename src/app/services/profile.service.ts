import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ProfileInterface } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private afStore: AngularFirestore) { }

  private profilesCollection: AngularFirestoreCollection<ProfileInterface>;
  private profiles: Observable<ProfileInterface[]>;
  private profileDoc: AngularFirestoreDocument<ProfileInterface>;
  private profile: Observable<ProfileInterface>;

  public selectedProfile: ProfileInterface = {
    id: null
  };

  getAllProfiles() {
    this.profilesCollection = this.afStore.collection<ProfileInterface>('perfiles');
    return this.profiles = this.profilesCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProfileInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getOneProfile(idProfile: string) {
    this.profileDoc = this.afStore.doc<ProfileInterface>(`perfiles/${idProfile}`);
    return this.profile = this.profileDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ProfileInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addProfile(profile: ProfileInterface): void {
    this.profilesCollection.add(profile);
  }

  updateProfile(profile: ProfileInterface): void {
    const idProfile = profile.id;
    this.profileDoc = this.afStore.doc<ProfileInterface>(`perfiles/${idProfile}`);
    this.profileDoc.update(profile);
  }

}

