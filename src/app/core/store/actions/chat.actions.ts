import { createAction, props } from '@ngrx/store';
import { Message, Room, UserSettings } from '../../models';

export enum MessageActionType {
  ADD_MESSAGE = '[CHAT] Add Message',
  ADD_ROOM = '[CHAT] Add Room',
  ADD_USER_SETTINGS = '[CHAT] Add User Settings',

  GET_MESSAGES = '[CHAT] Get Messages',
  GET_ROOMS = '[CHAT] Get Rooms',
  GET_USERS_SETTINGS = '[CHAT] Get Users Settings',

  INIT_CHAT = '[CHAT] Init Chat',
  SAVE_USER_SETTINGS = '[CHAT] Save User Settings',
}

export const AddMessage = createAction(
  MessageActionType.ADD_MESSAGE,
  props<{ message: Message }>()
);

export const AddRoom = createAction(
  MessageActionType.ADD_ROOM,
  props<{ room: Room }>()
);

export const AddUserSettings = createAction(
  MessageActionType.ADD_USER_SETTINGS,
  props<{ userSettings: UserSettings }>()
);

export const GetMessages = createAction(
  MessageActionType.GET_MESSAGES,
  props<{ messages: Array<Message> }>()
);

export const GetRooms = createAction(
  MessageActionType.GET_ROOMS,
  props<{ rooms: Array<Room> }>()
);

export const GetUsersSettings = createAction(
  MessageActionType.GET_USERS_SETTINGS,
  props<{ usersSettings: Array<UserSettings> }>()
);

export const InitChat = createAction(MessageActionType.INIT_CHAT);

export const SaveUserSettings = createAction(
  MessageActionType.SAVE_USER_SETTINGS,
  props<{ userSettings: UserSettings }>()
);
