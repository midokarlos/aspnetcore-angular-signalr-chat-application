import { Component } from '@angular/core';
import { Message } from './shared/models/Message';
import { SignalrConnectionService } from './core/services/signalr-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  txtMessage: string = '';
  uid: string = new Date().getTime().toString();
  messages = new Array<Message>();
  message = new Message();

  constructor(private signalrClientService: SignalrConnectionService) {

    this.signalrClientService.messageReceivedChanged$.subscribe((message: Message) => {
      if (message.clientuid !== this.uid) {
        message.type = "received";
        this.messages.push(message);
      }
    });
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuid = this.uid;
      this.message.type = "sent";
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.signalrClientService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
}
