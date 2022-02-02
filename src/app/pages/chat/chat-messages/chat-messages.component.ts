import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getMessages } from 'src/app/core/store/selectors/chat.selectors';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit {
  readonly defaultProfileImage = '../../../assets/images/default.png';
  @Input() activeChat = '';
  @Input() user: any;
  messages$: any;

  constructor(private store: Store<{ chat: any }>) {}

  ngOnInit(): void {
    this.messages$ = this.store.select(getMessages);
  }
}
