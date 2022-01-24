import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared/shared.module';

const routes: Route[] = [{ path: '', component: ChatComponent }];

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ChatModule {}
