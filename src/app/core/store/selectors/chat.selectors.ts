import { createSelector } from '@ngrx/store';
import { ChatState } from '../reducers/chat.reducers';

export const getRooms = createSelector(
  (state: any) => state.chat,
  (state: ChatState) => state.rooms
);

export const getMessages = createSelector(
  (state: any) => state.chat,
  (state: ChatState) => state.messages
);

export const getUsersSettings = createSelector(
  (state: any) => state.chat,
  (state: ChatState) => state.usersSettings
);
