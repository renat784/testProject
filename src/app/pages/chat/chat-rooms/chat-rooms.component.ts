import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Room, UserSettings } from 'src/app/core/models';
import {
  AddRoom,
  SaveUserSettings,
} from 'src/app/core/store/actions/chat.actions';
import { getRooms } from 'src/app/core/store/selectors/chat.selectors';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss'],
})
export class ChatRoomsComponent implements OnInit {
  @Input() activeChat: any;
  @Input() user: any;
  rooms$: any;

  constructor(private store: Store<{ chat: any }>) {}

  ngOnInit(): void {
    this.rooms$ = this.store.select(getRooms);
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
      name: this.generateRoomName(),
      date: new Date(),
    };

    this.store.dispatch(AddRoom({ room }));
  }

  // names can repeat themselves - for testing only
  generateRoomName(): string {
    return `Room ${new Date().getSeconds()}`;
  }
}
