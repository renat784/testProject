import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CHAT } from '../models/enum';
import { User, UserSettings } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public db: AngularFirestore, public auth: AngularFireAuth) {}

  createChatRoom(chat: any): void {
    this.db
      .collection(CHAT.ROOMS)
      .add(chat)
      .then(
        (res: any) => {
          console.log('createChatRoom success', res);
        },
        (err: any) => console.log('error on createChatRoom', err)
      );
  }

  addMessage(message: any): void {
    this.db
      .collection(CHAT.MESSAGES)
      .add(message)
      .then(
        (res: any) => {
          console.log('addMessage success', res);
        },
        (err: any) => console.log('error on addMessage', err)
      );
  }

  getAllMessages(): void {
    let userDoc = this.db.firestore.collection(CHAT.MESSAGES);
    userDoc.get().then(
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      },
      (err: any) => console.log('error on getAllMessages', err)
    );
  }

  saveUserSettings(userSettings: UserSettings) {
    this.db
      .collection(CHAT.USER_SETTINGS)
      .doc(userSettings.user?.uid)
      .set(
        {
          ...userSettings,
        },
        { merge: true }
      )
      .then(
        (res) => console.log('saveUserSettings success', res),
        (err: any) => console.log('error on saveUserSettings', err)
      );
  }

  loadUserSettings(user: User): Observable<any> {
    const uid = user.uid;
    return this.db.collection(CHAT.USER_SETTINGS).doc(uid).get();
  }
}
