import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heart'
})
export class HeartPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) {
      return 'red';
    }
    return 'black';
  }
}
