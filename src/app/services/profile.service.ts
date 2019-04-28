import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Profile } from '../models/profile.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileCollection: AngularFirestoreCollection<Profile>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { 
    this.profileCollection = this.afs.collection<Profile>('profile');
  }

  getProfile(id: string): Observable<Profile> {
    return this.profileCollection.doc<Profile>(id).valueChanges().pipe(
      take(1),
      map(profile => {
        profile.id = id;
        return profile;
      })
    );
  }

  updateProfile(profile: Profile): Promise<void> {
    return this.profileCollection.doc(profile.id).update(profile);
  }

  createProfile(profile: Profile) {
    this.profileCollection.doc(profile.id).set(profile);
  }

  deleteProfile(id: string): Promise<void> {
    return this.profileCollection.doc(id).delete();
  }

  // getProfile(userID): AngularFireObject<any> {
  //   return this.afd.object('/profile/' + userID);
  // }

  // setProfile(profile) {
  //   
  //     this.afd.object('/profile/' + auth.uid).set(profile);
  //   })
  // }

  // updateProfile(profile: Profile): Promise<void> {
  //   return this.contactCollection.doc(contact.id).update(contact);
  // }

  // deleteProfile(userID) {
  //   this.afd.object('/profile/' + userID).remove();
  // }
}
