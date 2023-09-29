import { Injectable } from '@angular/core';
import { Message } from '../models/Message';

@Injectable()
export class MessageService {

  public getMessages(): Message[] {
    let messages = [];
    for (let i = 0; i < 20; i++) {
      let msg = {content: '', source: ''};
      msg.content = this.generateRandomString();
      msg.source = Math.random() < 0.5 ? 'localhost' : 'other'
      messages.push(msg);
    }

    return messages;
  }

private generateRandomString() {
  const characterSet = "a bcdefg hijklm nopqr stuvw xyz0123 456789 ";
  const length = Math.floor(Math.random() * 50) + 1;
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    randomString += characterSet.charAt(randomIndex);
  }
  return randomString;
}

}
