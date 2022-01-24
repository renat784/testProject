import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByChatRoom',
})
export class FilterMessagesByChatRoomPipe implements PipeTransform {
  transform(array: any[], roomName: string): any {
    const result = array.filter((message) => message.roomName === roomName);
    return result;
  }
}
