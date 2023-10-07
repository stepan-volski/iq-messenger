import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ChatStoreModule } from './chat-store/chat-store.module';
import { UserStoreModule } from './user-store/user-store.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot({}),
    StoreDevtoolsModule.instrument(<any>{
      maxAge: 25,
      trace: true,
      name: 'IQ Messenger',
    }),
    ChatStoreModule,
    UserStoreModule,
  ],
})
export class RootStoreModule {}
