import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Message } from './models/Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketService],
})
export class AppComponent {
  title = 'socketrv';
  content = '';
  received: Message[] = [];
  sent: Message[] = [];

  constructor(private WebsocketService: WebsocketService) {
    WebsocketService.messages.subscribe((msg) => {
      this.received.push(msg);
      console.log('Response from websocket: ', msg);
    });
  }

  //can be removed?
  sendMsg() {
    let message = {
      source: '',
      content: '',
    };
    message.source = 'localhost';
    message.content = this.content;

    this.sent.push(message);
    this.WebsocketService.messages.next(message);
  }
}
