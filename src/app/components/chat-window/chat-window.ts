import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Conversation, Message } from '../../models/chat';
import { MessageService } from '../../services/message/message';
import { SocketService } from '../../services/socket';
import { User } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-window.html',
})
export class ChatWindow implements OnInit {
  private messageService = inject(MessageService);
  private socketService = inject(SocketService);

  conversation = input<Conversation | null>(null);
  currentUserId = input<string | undefined>('');

  handleRealtimeMessage = output<Message>();

  messages = signal<Message[]>([]);
  messageText = signal('');
  isTyping = signal(false);
  isSending = signal(false);

  videoCall = output<User>();
  audioCall = output<User>();

  constructor() {
    console.log(this.currentUserId());
    effect(() => {
      const conversation = this.conversation();

      if (!conversation) {
        this.messages.set([]);
        return;
      }

      this.loadMessages(conversation.id);

      this.socketService.joinConversation(conversation.id);
    });

    // effect(() => {
    const messageContainer = document.getElementById('messageContainer');
    console.log(messageContainer);

    if (this.messages() && messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    // }, {});
  }

  ngOnInit(): void {}

  loadMessages(conversationId: string): void {
    this.messageService.getMessages(conversationId).subscribe({
      next: (response) => {
        this.messages.set(response.messages || []);
      },
    });
  }

  sendMessage(): void {
    const text = this.messageText().trim();

    const conversation = this.conversation();

    if (!text || !conversation) {
      return;
    }

    const receiver = this.getOtherUser(conversation);

    if (!receiver) {
      return;
    }

    this.isSending.set(true);

    this.messageService.sendMessage(conversation.id, receiver.id, text).subscribe({
      next: (res) => {
        this.messages.update((messages) => [...messages, res.message]);

        this.handleRealtimeMessage.emit(res.message);

        this.messageText.set('');
      },
      error: (err) => {
        toast.error(err.error.message);
      },
      complete: () => {
        this.isSending.set(false);
      },
    });
  }

  onTyping(): void {
    const conversation = this.conversation();

    if (!conversation) {
      return;
    }

    this.socketService.sendTyping(conversation.id, this.currentUserId());
  }

  getOtherUser(conversation: Conversation): User | undefined {
    return conversation.participants.find((user) => user.id !== this.currentUserId());
  }

  startVideoCall(): void {
    const conversation = this.conversation();

    if (!conversation) {
      return;
    }

    const user = this.getOtherUser(conversation);

    if (user) {
      this.videoCall.emit(user);
    }
  }

  startAudioCall(): void {
    const conversation = this.conversation();

    if (!conversation) {
      return;
    }

    const user = this.getOtherUser(conversation);

    if (user) {
      this.audioCall.emit(user);
    }
  }

  scrollToBottom() {
    window.scrollTo({
      top: -100,
      behavior: 'smooth',
    });
  }
}
