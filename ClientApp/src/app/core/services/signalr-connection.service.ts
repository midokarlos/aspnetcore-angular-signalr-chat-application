import { Injectable, NgZone } from '@angular/core';
import { Message } from 'src/app/shared/models/Message';
import { Subject } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'

@Injectable({
  providedIn: 'root'
})
export class SignalrConnectionService {

  messageReceivedSubject: Subject<Message> = new Subject<Message>();
  messageReceivedChanged$ = this.messageReceivedSubject.asObservable();

  private hubConnection: HubConnection;

  constructor(private ngZone: NgZone) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message: Message) {
    this.hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(window.location.href + 'ChatHub')
      .build();
  }

  private registerOnServerEvents() {
    this.hubConnection.on('MessageReceived', (message: Message) => {
      this.ngZone.run(() => {
        this.messageReceivedSubject.next(message);
      });
    });
  }

  private startConnection(): void {
    this.hubConnection.start()
      .then(() => {
        console.log('Connection Started');
      })
      .catch(err => {
        console.log('Connection Error');
        setTimeout(() => {
          this.startConnection();
        }, 3000)
      });
  }

}
