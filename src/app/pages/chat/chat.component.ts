import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { CHAT, Message, Room, User, UserSettings } from 'src/app/core/models';
import { ChatService } from 'src/app/core/services';
import {
  AddMessage,
  AddRoom,
  InitChat,
  SaveUserSettings,
} from 'src/app/core/store/actions/chat.actions';
import {
  getMessages,
  getRooms,
  getUsersSettings,
} from 'src/app/core/store/selectors/chat.selectors';

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
  usersSettings: Array<any> = [];
  user: User | undefined;
  activeChat = '';
  msg = '';

  constructor(
    public db: AngularFirestore,
    public chatService: ChatService,
    public auth: AngularFireAuth,
    private store: Store<{ chat: any }>
  ) {
    this.store.dispatch(InitChat());
    this.selectData();
  }

  selectData() {
    this.store.select(getRooms).subscribe((rooms) => {
      this.rooms = rooms.length
        ? rooms.map((room: any) => {
            return { ...room, date: room.date.toDate() };
          })
        : this.rooms;

      console.log(
        '%c this.rooms ',
        'background-color:green; color:white',
        this.rooms
      );
    });

    this.store.select(getMessages).subscribe((messages) => {
      this.messages = messages.length
        ? messages.map((msg: any) => {
            return { ...msg, date: msg.date.toDate() };
          })
        : this.messages;

      console.log(
        '%c this.messages ',
        'background-color:green; color:white',
        this.messages
      );
    });

    this.store.select(getUsersSettings).subscribe((usersSettings) => {
      this.usersSettings = usersSettings.length ? usersSettings : [];
      console.log(
        '%c this.usersSettings ',
        'background-color:green; color:white',
        this.usersSettings
      );
      this.loadSettings();
    });
  }

  ngOnInit(): void {}

  loadSettings(): void {
    this.auth.user.subscribe((i) => {
      this.user = {
        uid: i?.uid,
        photoURL: i?.photoURL,
        displayName: i?.displayName,
      };

      let userSettings = this.usersSettings.find((i) => i.id == this.user?.uid);
      this.activeChat = userSettings ? userSettings.lastVisitedChat : '';
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

      this.store.dispatch(AddMessage({ message }));
      this.msg = '';
    }
  }

  chatClicked(roomName: string): void {
    this.activeChat = roomName;

    const userSettings: UserSettings = {
      user: this.user,
      lastVisitedChat: this.activeChat,
    };

    this.store.dispatch(SaveUserSettings({ userSettings }));
  }

  createChatRoom(): void {
    const room: Room = {
      user: this.user,
      name: `Room ${this.rooms.length + 1}`,
      date: new Date(),
    };

    this.store.dispatch(AddRoom({ room }));
  }

  login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): void {
    this.auth.signOut();
  }
}
