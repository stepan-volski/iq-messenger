import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState } from 'src/app/store';
import { selectChatState } from 'src/app/store/chat-store/selectors';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
})
export class ChatContainerComponent implements OnInit {
  private backgroundUrl = '';

  constructor(private store$: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.store$.select(selectChatState).subscribe((state) => {
      this.backgroundUrl = state.chatBackgroundUrl;
    });
  }

  getFormattedBackgroundUrl() {
    return { 'background-image': 'url(' + this.backgroundUrl + ')' };
  }
}
