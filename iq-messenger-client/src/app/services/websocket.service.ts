import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../models/Message';

const CHAT_URL = 'ws://localhost:5000';

@Injectable()
export class WebsocketService {
  private subject!: AnonymousSubject<MessageEvent>;
  messages: Subject<Message>;

  constructor() {
    this.messages = <Subject<Message>>(
      this.connect(CHAT_URL).pipe(
        map((response: MessageEvent): Message => JSON.parse(response.data))
      )
    );
  }

  connect(url: string): AnonymousSubject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  sendMessage(message: Message) {
    this.messages.next(message);
  }

  deleteMessage(message: Message) {
    const removeMessage: Message = {
      _id: message._id,
      type: 'message_remove',
    };
    this.sendMessage(removeMessage);
  }

  private create(url: string): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      error: null,
      complete: null,
      next: (data: Object) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    return new AnonymousSubject<MessageEvent>(observer as any, observable);
  }
}
