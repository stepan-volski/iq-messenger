import { Component } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { WebsocketService } from 'src/app/services/websocket.service';

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

  constructor(
    private websocketService: WebsocketService
  ) {

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
}
