import { Component, inject, output, signal } from '@angular/core';

import { Conversation, Message } from '../../models/chat';
import { ChatList } from '../../components/chat-list/chat-list';
import { ChatWindow } from '../../components/chat-window/chat-window';
import { MessageService } from '../../services/message/message';
import { SocketService } from '../../services/socket';
import { Auth, User } from '../../services/auth/auth';
import { CallScreen } from '../../components/call-screen/call-screen';
import { CallType } from '../../data/chat';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ChatList, ChatWindow, CallScreen],
  templateUrl: './messages.html',
})
export class Messages {
  private messageService = inject(MessageService);
  private authService = inject(Auth);

  private socketService = inject(SocketService);

  conversations = signal<Conversation[]>([]);
  selectedConversation = signal<Conversation | null>(null);

  messageReceived = output<Message>();

  realtimeMessage = signal<Message | null>(null);

  showCallScreen = signal(false);
  callType = signal<CallType | null>(null);
  callUser = signal<User | null>(null);

  get userId(): string | undefined {
    return this.authService.currentUser()?.id;
  }

  ngOnInit(): void {
    const userId = this.userId;
    if (!userId) return;

    this.socketService.connect();

    this.socketService.joinUser(userId);

    // console.log(userId);

    this.loadConversations();

    this.listenForMessages();
  }

  loadConversations(): void {
    this.messageService.getConversations().subscribe({
      next: (response) => {
        this.conversations.set(response.conversations || []);
      },
    });
  }

  private listenForMessages(): void {
    this.socketService.onNewMessage().subscribe({
      next: (message) => {
        this.realtimeMessage.set(message);
        console.log('Realtime message received:', message);

        this.handleRealtimeMessage(message);
      },
    });
  }

  handleRealtimeMessage(message: Message): void {
    console.log(message);
    const conversationId = this.getConversationId(message);

    if (!conversationId) {
      return;
    }

    console.log('Realtime conversation:', conversationId);

    // ==========
    // Update conversation list
    // ==========

    this.conversations.update((conversations) => {
      const exists = conversations.some((conversation) => conversation.id === conversationId);

      if (!exists) {
        return conversations;
      }

      return conversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        const isCurrentConversation = this.selectedConversation()?.id === conversationId;

        return {
          ...conversation,
          lastMessage: message,
          lastMessageAt: message.createdAt,
          unreadCount: isCurrentConversation ? 0 : (conversation.unreadCount || 0) + 1,
        };
      });
    });

    // ===============
    // Update active chat
    // ===============

    if (this.selectedConversation()?.id === conversationId) {
      this.messageReceived.emit(message);
    }
  }

  private getConversationId(message: Message): string | null {
    if (!message.conversation) {
      return null;
    }

    if (typeof message.conversation === 'string') {
      return message.conversation;
    }

    return message.conversation;
  }

  selectConversation(conversation: Conversation): void {
    this.selectedConversation.set(conversation);

    this.messageService.markAsRead(conversation.id).subscribe();

    // Update unread count locally

    const updated = this.conversations().map((item) => {
      if (item.id === conversation.id) {
        return {
          ...item,
          unreadCount: 0,
        };
      }

      return item;
    });

    this.conversations.set(updated);
  }

  startVideoCall(user: User): void {
    console.log('Start video call with:', user);

    // CallScreen will be opened here
    this.callUser.set(user);

    this.callType.set('video');

    this.showCallScreen.set(true);
  }

  startAudioCall(user: User): void {
    console.log('Start audio call with:', user);

    // CallScreen will be opened here
    this.callUser.set(user);

    this.callType.set('audio');

    this.showCallScreen.set(true);
  }

  onMessageSent(message: Message): void {
    const conversationId = this.getConversationId(message);

    if (!conversationId) {
      return;
    }

    this.conversations.update((conversations) =>
      conversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,
          lastMessage: message,
          lastMessageAt: message.createdAt,
        };
      }),
    );
  }
}
