import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CHAT } from '../models/enum';
import { Message, Room, UserSettings } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public db: AngularFirestore, public auth: AngularFireAuth) {}

  createChatRoom(room: Room): Promise<any> {
    return this.db.collection(CHAT.ROOMS).add(room);
  }

  addMessage(message: Message): Promise<any> {
    return this.db.collection(CHAT.MESSAGES).add(message);
  }

  saveUserSettings(userSettings: UserSettings): Promise<void> {
    return this.db
      .collection(CHAT.USER_SETTINGS)
      .doc(userSettings.user?.uid)
      .set(
        {
          ...userSettings,
        },
        { merge: true }
      );
  }
}
