import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedElementsService {
  private elementRefs: Map<string, ElementRef> = new Map();

  constructor() {}

  registerElement(key: string, elementRef: ElementRef): void {
    this.elementRefs.set(key, elementRef);
  }

  getElement(key: string): ElementRef | undefined {
    return this.elementRefs.get(key);
  }
}
