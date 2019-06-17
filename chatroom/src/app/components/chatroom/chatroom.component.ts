import { Component, OnInit } from '@angular/core';
import { ChatroomService } from 'src/app/services/chatroom.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.sass']
})
export class ChatroomComponent implements OnInit {
  constructor(private cs: ChatroomService) {}
  messagesArr;
  hash = localStorage.getItem('userHash');
  nrMessages: number = 0;
  message;
  code: number;

  getMessagesComp() {
    this.cs.getMessages().subscribe(res => {
      this.messagesArr = res.Messages;

      setTimeout(() => {
        if (this.nrMessages < this.messagesArr.length) {
          this.nrMessages = this.messagesArr.length;
          let messages = document.querySelector('#messages');
          messages.scrollTop = messages.scrollHeight;
        }
      }, 1);
    });
  }

  sendMessageComp(hash, message) {
    this.cs.sendMessage(hash, message).subscribe(res => {
      this.code = res.retour;
    });
  }

  sendMessageForm() {
    this.sendMessageComp(this.hash, this.message);
    this.getMessagesComp();
    this.message = '';
  }

  ngOnInit() {
    // this.getMessagesComp();
    setInterval(() => this.getMessagesComp(), 500);
  }
}
