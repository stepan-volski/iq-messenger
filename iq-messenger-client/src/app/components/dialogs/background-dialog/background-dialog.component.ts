import { Component } from '@angular/core';
import { backgroundTitles } from '../../../../assets/background/background-titles';

@Component({
  selector: 'app-background-dialog',
  templateUrl: './background-dialog.component.html',
  styleUrls: ['./background-dialog.component.scss']
})
export class BackgroundDialogComponent {
  urlTemplate = '../../../../assets/background/';
  backgroundUrls = backgroundTitles.map(title => this.urlTemplate + title + '.svg');


  setBackground(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.dataset) {
      console.log(targetElement.dataset['image'])
    }

  }

}
