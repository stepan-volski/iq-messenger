import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ChatFooterComponent } from './components/chat-footer/chat-footer.component';
import { MessageContainerComponent } from './components/message-container/message-container.component';
import { ChatContainerComponent } from './components/chat-container/chat-container.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { BackgroundDialogComponent } from './components/dialogs/background-dialog/background-dialog.component';
import { RootStoreModule } from './store/root-store.module';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { AbbreviationPipe } from './pipes/abbreviation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ChatHeaderComponent,
    ChatFooterComponent,
    MessageContainerComponent,
    ChatContainerComponent,
    BackgroundDialogComponent,
    LoginComponent,
    UserMenuComponent,
    AbbreviationPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDialogModule,
    RootStoreModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
