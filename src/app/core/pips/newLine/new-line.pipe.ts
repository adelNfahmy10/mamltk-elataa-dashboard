import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine',
  standalone: true
})
export class NewLinePipe implements PipeTransform {

  transform(value: string): string {
    return value?.replace(/\./g, '.<br>') || '';
  }

}
