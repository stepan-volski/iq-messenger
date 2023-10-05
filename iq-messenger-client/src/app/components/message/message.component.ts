import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: Message;

  constructor(private websocketService: WebsocketService) {}

  deleteMessage() {
    const removeMessage: Message = {
      _id: this.message._id,
      type: 'message_remove',
    };
    this.websocketService.sendMessage(removeMessage);
  }
}
