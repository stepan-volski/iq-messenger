import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  intervalId: any;

  startNotification() {
    this.intervalId = setInterval(() => this.changeTitle(), 1000);
  }

  stopNotification() {
    clearInterval(this.intervalId);
    document.title = 'Iq-Messenger';
  }

  private changeTitle() {
    if (document.title === 'Iq-Messenger NEW') {
      document.title = 'Iq-Messenger';
    } else {
      document.title = 'Iq-Messenger NEW';
    }
  }
}
