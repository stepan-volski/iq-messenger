import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviation',
})
export class AbbreviationPipe implements PipeTransform {
  transform(value: unknown): string {
    if (!value || typeof value !== 'string') {
      return '';
    }
    return value.slice(0, 2).toUpperCase();
  }
}
