import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Leo Santos';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onSendMessage() {
    const msgSubject: string = this.subject.nativeElement.value;
    const msgText: string = this.msgText.nativeElement.value;
    const id: string = '1';
    let message: Message = new Message(
      id,
      msgSubject,
      msgText,
      this.currentSender
    );
    this.messageService.addMessage(message);

    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
