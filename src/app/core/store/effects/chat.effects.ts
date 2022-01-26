import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { ChatService } from '../../services';
import { AddMessage, AddRoom, SaveUserSettings } from '../actions/chat.actions';

@Injectable()
export class ChatEffects {
  constructor(private chatService: ChatService, private actions$: Actions) {}

  addMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AddMessage),
        pluck('message'),
        switchMap((i) => this.chatService.addMessage(i)),
        tap((i) =>
          console.log('%c i ', 'background-color:green; color:white', i)
        )
      );
    },
    { dispatch: false }
  );

  addRoom$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AddRoom),
        pluck('room'),
        switchMap((i) => this.chatService.createChatRoom(i)),
        tap((i) =>
          console.log('%c i ', 'background-color:green; color:white', i)
        )
      );
    },
    { dispatch: false }
  );

  saveUserSettings$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(SaveUserSettings),
        pluck('userSettings'),
        switchMap((i) => this.chatService.saveUserSettings(i)),
        tap((i) =>
          console.log('%c i ', 'background-color:green; color:white', i)
        )
      );
    },
    { dispatch: false }
  );
}
