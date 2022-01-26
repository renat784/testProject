import { createReducer, on } from '@ngrx/store';
import { Message, Room, UserSettings } from '../../models';
import {
  GetMessages,
  GetRooms,
  GetUsersSettings,
} from '../actions/chat.actions';

export interface ChatState {
  usersSettings: Array<UserSettings>;
  rooms: Array<Room>;
  messages: Array<Message>;
}

export const initialState: ChatState = {
  usersSettings: [],
  rooms: [],
  messages: [],
};

const _chatReducer = createReducer(
  initialState,

  on(GetMessages, (state: any, action: any) => {
    return {
      ...state,
      messages: action.messages,
    };
  }),

  on(GetRooms, (state: any, action: any) => {
    return {
      ...state,
      rooms: action.rooms,
    };
  }),

  on(GetUsersSettings, (state: any, action: any) => {
    return {
      ...state,
      usersSettings: action.usersSettings,
    };
  })
);

export function chatReducer(state: any, action: any) {
  return _chatReducer(state, action);
}
