import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { messageMenuAnimation } from 'src/app/animations/context-menu';
import { Message } from 'src/app/models/Message';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RootStoreState } from 'src/app/store';
import { selectMessageWithContextMenu } from 'src/app/store/chat-store/selectors';
import { selectCurrentUserName } from 'src/app/store/user-store/selectors';
import { MessageMenuComponent } from '../message-menu/message-menu/message-menu.component';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss'],
  animations: [messageMenuAnimation],
})
export class MessageContainerComponent {
  @ViewChild('container') container: ElementRef | undefined;
  @ViewChild('contextMenu') contextMenuRef!: MessageMenuComponent;
  content = '';
  received: Message[] = [];
  sent: Message[] = [];
  currentUserName: string | null = '';
  destroyed$ = new Subject<void>();
  isContextMenuOpened = false;
  menuState = this.isContextMenuOpened ? 'void' : 'active';
  contextMenuPosition: { [key: string]: string } = {};

  @HostListener('document:click', ['$event'])
  closeMenuOnOutsideClick(event: Event) {
    if (
      this.isContextMenuOpened &&
      !this.contextMenuRef!.nativeElement.contains(event.target)
    ) {
      this.closeContextMenu();
    }
  }

  constructor(
    private store$: Store<RootStoreState.State>,
    private websocketService: WebsocketService,
    private contextMenuService: ContextMenuService
  ) {
    this.store$
      .select(selectCurrentUserName)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((name) => (this.currentUserName = name));

    this.store$
      .select(selectMessageWithContextMenu)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message) => {
        this.isContextMenuOpened = !!message;
      });

    //TODO: can move it to service? or put into init method?
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

    //can be removed?
    setTimeout(() => {
      const initChatMessage = {
        author: 'Aleksey',
        content: '',
        type: 'chat_init',
      };

      this.websocketService.sendMessage(initChatMessage);
    }, 1000);
  }

  //can be removed?
  sendMsg() {
    const message = {
      author: 'Aleksey',
      content: this.content,
      timeStamp: new Date(),
    };

    this.sent.push(message);
    this.websocketService.sendMessage(message);
  }

  closeContextMenu() {
    this.contextMenuService.closeContextMenu();
  }

  setContextMenuPosition(event: MouseEvent) {
    this.contextMenuPosition['top'] = (event.target as any).offsetTop + 'px';
    this.contextMenuPosition['left'] =
      (event.target as any).offsetLeft +
      (event.target as any).offsetWidth +
      15 +
      'px';
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
