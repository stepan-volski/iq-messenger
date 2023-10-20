import { Injectable } from '@angular/core';
import { ChatStoreActions } from '.';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WebsocketService } from 'src/app/services/websocket.service';
import { EMPTY, Observable, mergeMap, of, switchMap, tap } from 'rxjs';

@Injectable()
export class Effects {
  initChat$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ChatStoreActions.ChatStoreActions.init),
        tap(({ username }) =>
          this.webSocketService.sendMessage({
            author: username,
            content: '',
            type: 'chat_init',
          })
        ),
        switchMap(() => EMPTY)
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private webSocketService: WebsocketService
  ) {}
}
