import { Component } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss'],
  providers: [MessageService],
})
export class MessageContainerComponent {
  // public messages: Message[];

  content = '';
  received: Message[] = [];
  sent: Message[] = [];

  constructor(private messageService: MessageService, private websocketService: WebsocketService) {
    // this.messages = this.messageService.getMessages();

    websocketService.messages.subscribe((msg: Message | Message[]) => {
      if (Array.isArray(msg)) {
        this.received = this.received.concat(msg);
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

      this.websocketService.messages.next(initChatMessage);
    }, 1000);
  }

  sendMsg() {
    const message = {
      author: 'Aleksey',
      content: this.content,
      timeStamp: new Date(),
    };

    this.sent.push(message);
    this.websocketService.messages.next(message);
  }
}
