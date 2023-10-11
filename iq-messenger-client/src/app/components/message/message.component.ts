import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { WebsocketService } from 'src/app/services/websocket.service';
import { State } from 'src/app/store/state';
import { selectCurrentUserName } from 'src/app/store/user-store/selectors';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: Message;
  private currentUserName!: string | null;
  destroyed$ = new Subject<void>();

  get isMyMessage(): boolean {
    return this.currentUserName === this.message.author;
  }

  constructor(
    private store$: Store<State>,
    private websocketService: WebsocketService
  ) {
    this.store$
      .select(selectCurrentUserName)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((name) => (this.currentUserName = name));
  }

  deleteMessage() {
    const removeMessage: Message = {
      _id: this.message._id,
      type: 'message_remove',
    };
    this.websocketService.sendMessage(removeMessage);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
