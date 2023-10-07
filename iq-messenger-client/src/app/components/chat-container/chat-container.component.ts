import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/store';
import { selectChatState } from 'src/app/store/chat-store/selectors';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent {

  chatBackgroundUrl;

  constructor(private store$: Store<RootStoreState.State>) {

    this.chatBackgroundUrl = '../../../assets/chat-bg.svg';
  }

  ngOnInit() {

    this.chatBackgroundUrl = '../../../assets/chat-bg.svg';

    this.store$
      .select(selectChatState)
      .pipe()
      .subscribe((state) => {
        this.chatBackgroundUrl = state.chatBackgroundUrl;
      });
  }
}
