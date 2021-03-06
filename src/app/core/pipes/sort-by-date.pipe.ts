import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {
  transform(array: any[] | null): any[] {
    if (array && array.length) {
      let sorted = [...array].sort((a, b) => a.date - b.date);
      return sorted;
    }

    return [];
  }
}
