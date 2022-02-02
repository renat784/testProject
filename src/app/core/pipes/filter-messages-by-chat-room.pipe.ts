import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models';

@Pipe({
  name: 'filterByChatRoom',
})
export class FilterMessagesByChatRoomPipe implements PipeTransform {
  transform(array: Message[] | null, roomName: string): any {
    if (array && array.length) {
      const result = array.filter(
        (message: Message) => message.roomName === roomName
      );
      return result;
    }
    return [];
  }
}
