import { Component } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
})
export class ChatFooterComponent {
  message = '';
  author = '';

  constructor(private websocketService: WebsocketService) {}

  sendMsg() {
    const message: Message = {
      author: this.author,
      content: this.message,
      timeStamp: new Date(),
    };

    this.websocketService.messages.next(message);
    this.message = '';
  }

  onAuthorToggleChange(event: any) {
    this.author = event.value;
  }
}
