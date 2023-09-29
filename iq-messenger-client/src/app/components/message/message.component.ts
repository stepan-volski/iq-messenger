import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input()
  message!: Message;
}
