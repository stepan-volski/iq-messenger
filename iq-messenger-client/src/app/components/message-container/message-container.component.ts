import { Component } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss'],
  providers: [MessageService],
})
export class MessageContainerComponent {
  public messages: Message[];

  constructor(private messageService: MessageService) {
    this.messages = this.messageService.getMessages();
  }
}
