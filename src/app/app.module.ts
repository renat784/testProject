import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { chatReducer } from './core/store/reducers/chat.reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects, InitEffects } from './core/store/effects';
import { TopBarModule } from './pages/top-bar/top-bar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    EffectsModule.forRoot([InitEffects, ChatEffects]),
    StoreModule.forRoot({ chat: chatReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: AUTH_SETTINGS,
      useValue: { appVerificationDisabledForTesting: true },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
