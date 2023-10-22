import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { messageMenuAnimation } from 'src/app/animations/context-menu';
import { Message } from 'src/app/models/Message';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SharedElementsService } from 'src/app/services/shared-elements.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { RootStoreState } from 'src/app/store';
import { ChatStoreActions } from 'src/app/store/chat-store/actions';
import {
  selectMessageWithContextMenu,
  selectPrintedMessages,
} from 'src/app/store/chat-store/selectors';
import { selectCurrentUserName } from 'src/app/store/user-store/selectors';
import { MessageMenuComponent } from '../message-menu/message-menu/message-menu.component';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss'],
  animations: [messageMenuAnimation],
})
export class MessageContainerComponent implements AfterViewInit {
  @ViewChild('messageContainer') messageContainer: ElementRef | undefined;
  @ViewChild('contextMenu') contextMenuRef!: MessageMenuComponent;
  content = '';
  sent: Message[] = [];
  currentUserName: string | null = '';
  destroyed$ = new Subject<void>();
  isContextMenuOpened = false;
  menuState = this.isContextMenuOpened ? 'void' : 'active';
  contextMenuPosition: { [key: string]: string } = {};
  messages$ = this.store$.select(selectPrintedMessages);
  isUnreadMessagesPresent = false;

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
    private contextMenuService: ContextMenuService,
    private sharedElementsService: SharedElementsService,
    private notificationService: NotificationService
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

  ngAfterViewInit(): void {
    //TODO: remove timeOut
    if (this.messageContainer) {
      setTimeout(() => {
        this.scrollMessagesToBottom();
      }, 2000);

      this.sharedElementsService.registerElement(
        'messageContainer',
        this.messageContainer!
      );
    }
  }

  setContextMenuPosition(event: MouseEvent) {
    this.contextMenuPosition['top'] = (event.target as any).offsetTop + 'px';
    this.contextMenuPosition['left'] =
      (event.target as any).offsetLeft +
      (event.target as any).offsetWidth +
      15 +
      'px';
  }

  scrollMessagesToBottom() {
    if (this.messageContainer) {
      const container = this.messageContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  //TODO: rework this method after read/unread status in Message is implemented
  markAllMessagesAsRead() {
    this.isUnreadMessagesPresent = false;
    this.notificationService.stopNotification();
  }

  //TODO: rework this method after read/unread status in Message is implemented
  showNewMessageNotification(msg: Message) {
    if (!this.isUnreadMessagesPresent && msg.author !== this.currentUserName) {
      this.isUnreadMessagesPresent = true;
      this.notificationService.startNotification();
    }

    if (msg.content === 'stop') {
      this.markAllMessagesAsRead();
    }
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

      this.showNewMessageNotification(msg);
    });
  }

  private initChat() {
    this.store$.dispatch(
      ChatStoreActions.init({ username: this.currentUserName || '' })
    );
  }
}
