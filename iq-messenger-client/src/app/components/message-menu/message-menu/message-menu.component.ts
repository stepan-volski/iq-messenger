import { Component, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { selectMessageWithContextMenu } from 'src/app/store/chat-store/selectors';
import { State } from 'src/app/store/state';

@Component({
  selector: 'app-message-menu',
  templateUrl: './message-menu.component.html',
  styleUrls: ['./message-menu.component.scss'],
})
export class MessageMenuComponent {
  destroyed$ = new Subject<void>();
  message: Message | null = null;

  constructor(
    private store$: Store<State>,
    private websocketService: WebsocketService,
    private contextMenuService: ContextMenuService,
    private elementRef: ElementRef
  ) {
    this.store$
      .select(selectMessageWithContextMenu)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((message) => (this.message = message));
  }

  selectMenuItem(option: string) {
    switch (option) {
      case 'reply':
      case 'edit':
      case 'copy':
      case 'pin':
      case 'forward':
      case 'select':
        this.closeContextMenu();
        break;
      case 'delete':
        this.deleteMessage();
        break;
    }
  }

  get nativeElement(): any {
    return this.elementRef.nativeElement;
  }

  private closeContextMenu() {
    this.contextMenuService.closeContextMenu();
  }

  deleteMessage() {
    if (this.message) {
      this.websocketService.deleteMessage(this.message);
    }
    this.closeContextMenu();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
