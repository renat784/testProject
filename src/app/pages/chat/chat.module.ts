import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatWriteMessageComponent } from './chat-write-message/chat-write-message.component';

const routes: Route[] = [{ path: '', component: ChatComponent }];

@NgModule({
  declarations: [ChatComponent, ChatRoomsComponent, ChatMessagesComponent, ChatWriteMessageComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ChatModule {}
