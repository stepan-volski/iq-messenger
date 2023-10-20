import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Message } from './models/Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketService],
})
export class AppComponent {}
