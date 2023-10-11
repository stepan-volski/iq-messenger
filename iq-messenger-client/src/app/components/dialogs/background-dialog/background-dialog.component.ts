import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChatStoreActions } from 'src/app/store/chat-store/actions';
import { backgroundTitles } from '../../../../assets/background/background-titles';
import { State } from 'src/app/store/state';

@Component({
  selector: 'app-background-dialog',
  templateUrl: './background-dialog.component.html',
  styleUrls: ['./background-dialog.component.scss'],
})
export class BackgroundDialogComponent {
  constructor(private store$: Store<State>) {}

  setBackground(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.dataset) {
      this.store$.dispatch(
        ChatStoreActions.setChatBackground({
          chatBackgroundUrl: targetElement.dataset['image'] as string,
        })
      );
    }
  }

  getBackgroundUrls() {
    const urlTemplate = '../../../assets/background/';
    return backgroundTitles.map((title) => urlTemplate + title + '.svg');
  }
}
