import { trigger, state, style, animate, transition } from '@angular/animations';

export const messageMenuAnimation = trigger('messageMenuAnimation', [
  state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
  transition(':enter, :leave', [
    animate(200),
  ]),
]);
