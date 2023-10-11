import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RootStoreState } from 'src/app/store';
import { State } from 'src/app/store/state';
import { selectCurrentUserName } from 'src/app/store/user-store/selectors';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss'],
  providers: [],
})
export class MessageContainerComponent {
  content = '';
  received: Message[] = [];
  sent: Message[] = [];
  currentUserName: string | null = '';
  destroyed$ = new Subject<void>();

  constructor(
    private store$: Store<RootStoreState.State>,
    private websocketService: WebsocketService
  ) {
    this.store$
      .select(selectCurrentUserName)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((name) => (this.currentUserName = name));

    websocketService.messages.subscribe((msg: Message | Message[]) => {
      if (Array.isArray(msg)) {
        this.received = this.received.concat(msg);
      } else if (msg.type === 'message_remove') {
        this.received.splice(
          this.received.map((message) => message._id).indexOf(msg._id),
          1
        );
      } else {
        this.received.push(msg);
      }
      console.log('Response from websocket: ', msg);
    });

    setTimeout(() => {
      const initChatMessage = {
        author: 'Aleksey',
        content: '',
        type: 'chat_init',
      };

      this.websocketService.sendMessage(initChatMessage);
    }, 1000);
  }

  sendMsg() {
    const message = {
      author: 'Aleksey',
      content: this.content,
      timeStamp: new Date(),
    };

    this.sent.push(message);
    this.websocketService.sendMessage(message);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
