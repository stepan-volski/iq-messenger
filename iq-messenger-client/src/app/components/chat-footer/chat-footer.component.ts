import { Component } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Store } from '@ngrx/store';
import { selectUserState } from 'src/app/store/user-store/selectors';
import { UserStoreActions } from 'src/app/store/user-store/actions';
import { RootStoreState } from 'src/app/store';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
})
export class ChatFooterComponent {
  message = '';
  author!: string | null;

  constructor(
    private store$: Store<RootStoreState.State>,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    this.store$
      .select(selectUserState)
      .pipe()
      .subscribe((state) => {
        this.author = state.currentUser;
      });
  }

  sendMsg() {
    const message: Message = {
      author: this.author,
      content: this.message,
      timeStamp: new Date(),
    };

    this.websocketService.messages.next(message);
    this.message = '';
  }
}
