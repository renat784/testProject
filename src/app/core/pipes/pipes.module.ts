import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterMessagesByChatRoomPipe, SortByDatePipe } from '.';

@NgModule({
  declarations: [FilterMessagesByChatRoomPipe, SortByDatePipe],
  imports: [CommonModule],
  exports: [FilterMessagesByChatRoomPipe, SortByDatePipe],
})
export class PipesModule {}
