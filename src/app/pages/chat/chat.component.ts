import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { InitChat } from 'src/app/core/store/actions/chat.actions';
import { getUsersSettings } from 'src/app/core/store/selectors/chat.selectors';
import { mapUser, SubscriptionDetacher } from 'src/app/core/utils';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  private detacher = new SubscriptionDetacher();
  activeChat = '';
  user: any;

  constructor(
    public auth: AngularFireAuth,
    private store: Store<{ chat: any }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(InitChat());
    this.loadSettings();
  }

  loadSettings() {
    const user$ = this.auth.user.pipe(
      map((user) => mapUser(user)),
      this.detacher.takeUntilDetach()
    );

    const usersSettings$ = this.store
      .select(getUsersSettings)
      .pipe(this.detacher.takeUntilDetach());

    combineLatest([user$, usersSettings$]).subscribe(
      ([user, usersSettings]) => {
        let userSettings = usersSettings.find(
          (settings: any) => settings?.id == user?.uid
        );

        this.activeChat = userSettings ? userSettings.lastVisitedChat : '';
        this.user = user;
      }
    );
  }

  ngOnDestroy(): void {
    this.detacher.detach();
  }
}
