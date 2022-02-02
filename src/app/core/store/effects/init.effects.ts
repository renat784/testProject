import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CHAT } from '../../models';
import {
  GetMessages,
  GetRooms,
  GetUsersSettings,
  InitChat,
} from '../actions/chat.actions';

@Injectable()
export class InitEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    public db: AngularFirestore
  ) {}

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InitChat),
      take(1),
      tap(() => this.getData())
    );
  });

  getData() {
    this.getMessages().subscribe((messages) => {
      this.store.dispatch(GetMessages({ messages }));
    });

    this.getRooms().subscribe((rooms) => {
      this.store.dispatch(GetRooms({ rooms }));
    });

    this.getUsersSettings().subscribe((usersSettings) => {
      this.store.dispatch(GetUsersSettings({ usersSettings }));
    });
  }

  private getMessages(): Observable<any> {
    return this.db.collection(CHAT.MESSAGES).valueChanges({ idField: 'id' });
  }

  private getRooms(): Observable<any> {
    return this.db.collection(CHAT.ROOMS).valueChanges({ idField: 'id' });
  }

  private getUsersSettings(): Observable<any> {
    return this.db
      .collection(CHAT.USER_SETTINGS)
      .valueChanges({ idField: 'id' });
  }
}
