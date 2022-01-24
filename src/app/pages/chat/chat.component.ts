import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { CHAT, Message, Room, User, UserSettings } from 'src/app/core/models';
import { ChatService } from 'src/app/core/services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  readonly logo = '../../../assets/images/icon-512x512.png';
  readonly defaultProfileImage = '../../../assets/images/default.png';

  messages: Array<Message> = [];
  rooms: Array<Room> = [];
  user: User | undefined;
  activeChat = '';
  msg = '';

  constructor(
    public db: AngularFirestore,
    public chatService: ChatService,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.loadSettings();
    this.trackChanges();
  }

  loadSettings(): void {
    this.auth.user.subscribe((i) => {
      this.user = {
        uid: i?.uid,
        photoURL: i?.photoURL,
        displayName: i?.displayName,
      };

      this.chatService.loadUserSettings(this.user).subscribe((doc) => {
        this.activeChat = doc.exists ? doc.data().lastVisitedChat : '';
      });
    });
  }

  trackChanges(): void {
    this.db
      .collection(CHAT.ROOMS)
      .valueChanges({ idField: 'id' })
      .subscribe((i: any) => {
        this.rooms = i;
      });

    this.db
      .collection(CHAT.MESSAGES)
      .valueChanges({ idField: 'id' })
      .subscribe((i: any) => {
        this.messages = i;
      });
  }

  sendMessage(): void {
    if (this.msg) {
      const message: Message = {
        user: this.user,
        text: this.msg,
        date: new Date(),
        roomName: this.activeChat,
      };

      this.chatService.addMessage(message);
      this.msg = '';
    }
  }

  chatClicked(roomName: string): void {
    this.activeChat = roomName;

    const userSettings: UserSettings = {
      user: this.user,
      lastVisitedChat: this.activeChat,
    };
    this.chatService.saveUserSettings(userSettings);
  }

  createChatRoom(): void {
    const room: Room = {
      user: this.user,
      name: `Room ${this.rooms.length + 1}`,
      date: new Date(),
    };
    this.chatService.createChatRoom(room);
  }

  login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.auth.signOut();
  }
}
