import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { ChatStoreActions } from 'src/app/store/chat-store/actions';
import { State } from 'src/app/store/state';
import { selectCurrentUserName } from 'src/app/store/user-store/selectors';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: Message;
  @Output() messageClicked: EventEmitter<MouseEvent> = new EventEmitter();

  currentUserName!: string | null;
  destroyed$ = new Subject<void>();

  get isMyMessage(): boolean {
    return this.currentUserName === this.message.author;
  }

  constructor(private store$: Store<State>) {
    this.store$
      .select(selectCurrentUserName)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((name) => (this.currentUserName = name));
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.store$.dispatch(
      ChatStoreActions.toggleMessageContextMenu({
        messageWithContextMenu: this.message,
      })
    );
    this.messageClicked.emit(event);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
