import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { messageMenuAnimation } from 'src/app/animations/context-menu';
import { Message } from 'src/app/models/Message';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RootStoreState } from 'src/app/store';
import {
  selectMessageWithContextMenu,
  selectPrintedMessages,
} from 'src/app/store/chat-store/selectors';
import { selectCurrentUserName } from 'src/app/store/user-store/selectors';
import { MessageMenuComponent } from '../message-menu/message-menu/message-menu.component';
import { ChatStoreActions } from 'src/app/store/chat-store/actions';

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
  sent: Message[] = [];
  currentUserName: string | null = '';
  destroyed$ = new Subject<void>();
  isContextMenuOpened = false;
  menuState = this.isContextMenuOpened ? 'void' : 'active';
  contextMenuPosition: { [key: string]: string } = {};
  messages$ = this.store$.select(selectPrintedMessages);

  @HostListener('document:click', ['$event'])
  closeMenuOnOutsideClick(event: Event) {
    if (this.isContextMenuOpened) {
      if (!this.contextMenuRef!.nativeElement.contains(event.target)) {
        this.closeContextMenu();
      }
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

    this.handleMessages();

    setTimeout(() => this.initChat(), 1000);
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

  private handleMessages() {
    this.websocketService.messages.subscribe((msg: Message | Message[]) => {
      console.log('Response from websocket: ', msg);

      if (Array.isArray(msg)) {
        this.store$.dispatch(ChatStoreActions.printMessages({ messages: msg }));
        return;
      }

      if (msg.type === 'message_remove') {
        this.store$.dispatch(
          ChatStoreActions.deletePrintedMessage({ messageId: msg._id || '' })
        );
        return;
      }

      this.store$.dispatch(
        ChatStoreActions.addPrintedMessage({ message: msg })
      );
    });
  }

  private initChat() {
    const initChatMessage = {
      author: this.currentUserName,
      content: '',
      type: 'chat_init',
    };

    this.websocketService.sendMessage(initChatMessage);
  }
}
