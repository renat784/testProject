import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from 'src/app/core/models';
import { AddMessage } from 'src/app/core/store/actions/chat.actions';

@Component({
  selector: 'app-chat-write-message',
  templateUrl: './chat-write-message.component.html',
  styleUrls: ['./chat-write-message.component.scss'],
})
export class ChatWriteMessageComponent implements OnInit {
  @Input() user: any;
  @Input() activeChat: any;
  msg = '';

  constructor(private store: Store<{ chat: any }>) {}

  ngOnInit(): void {}

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
}
