import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ChatStoreActions } from '../store/chat-store/actions';
import { selectMessageWithContextMenu } from '../store/chat-store/selectors';
import { State } from '../store/state';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  //TODO: later may be replaced by store actions

  isContextMenuOpened = false;
  menuState = this.isContextMenuOpened ? 'void' : 'active';
  destroyed$ = new Subject<void>();

  constructor(private store$: Store<State>) {
    this.store$
      .select(selectMessageWithContextMenu)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message) => {
        this.isContextMenuOpened = !!message;
      });
  }

  closeContextMenu() {
    this.menuState = 'void';
    this.store$.dispatch(
      ChatStoreActions.toggleMessageContextMenu({
        messageWithContextMenu: null,
      })
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
