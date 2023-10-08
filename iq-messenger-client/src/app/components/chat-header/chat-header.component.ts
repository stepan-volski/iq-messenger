import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackgroundDialogComponent } from '../dialogs/background-dialog/background-dialog.component';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent {

  //@ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(public dialog: MatDialog) {}

  openBackgroundSelectorDialog() {
    const dialogRef = this.dialog.open(BackgroundDialogComponent);

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    //dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

}
