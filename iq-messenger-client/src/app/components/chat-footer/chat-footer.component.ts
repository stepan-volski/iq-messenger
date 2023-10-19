import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from 'src/app/models/Message';
import { SharedElementsService } from 'src/app/services/shared-elements.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RootStoreState } from 'src/app/store';
import { selectUserState } from 'src/app/store/user-store/selectors';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss'],
})
export class ChatFooterComponent implements OnInit {
  message = '';
  author!: string | null;
  @ViewChild('input') inputField!: ElementRef;

  @HostListener('document:click', ['$event'])
  focusInputField() {
    if (this.inputField) this.inputField.nativeElement.focus();
  }

  constructor(
    private store$: Store<RootStoreState.State>,
    private websocketService: WebsocketService,
    private sharedElementsService: SharedElementsService
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
    if (this.message.length > 0) {
      const message: Message = {
        author: this.author,
        content: this.message,
        timeStamp: new Date(),
      };
      this.websocketService.messages.next(message);
      this.message = '';
    }
    setTimeout(() => {    //todo: remove timeOut
      this.scrollMessagesDown();
    }, 150);
  }

  scrollMessagesDown() {
    const parentElementRef =
      this.sharedElementsService.getElement('messageContainer');

    if (parentElementRef) {
      const container = parentElementRef.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
}
