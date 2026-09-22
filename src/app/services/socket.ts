import { Service } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Message } from '../models/chat';

const apiUrl = environment.apiBaseUrl;

@Service()
export class SocketService {
  private socket!: Socket;

  private readonly serverUrl = `${apiUrl}`;

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(this.serverUrl, { withCredentials: true, transports: ['websocket'] });

    this.socket.on('connect', () => {
      console.log('Socket conntectd:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  joinUser(userId: string | undefined): void {
    this.socket.emit('join-user', userId);

    console.log('Joining socket room:', userId);
  }

  joinConversation(conversationId: string): void {
    this.socket.emit('join-conversation', conversationId);
  }

  sendTyping(conversationId: string, userId: string | undefined): void {
    this.socket.emit('typing', {
      conversationId,
      userId,
    });
  }

  stopTyping(conversationId: string, userId: string): void {
    this.socket.emit('stop-typing', {
      conversationId,
      userId,
    });
  }

  onNewMessage(): Observable<Message> {
    return new Observable((subscriber) => {
      this.socket.on('new-message', (message: Message) => {
        subscriber.next(message);
      });

      return () => {
        this.socket.off('new-message');
      };
    });
  }

  onMessageSent(): Observable<Message> {
    return new Observable((subscriber) => {
      this.socket.on('message-sent', (message: Message) => {
        subscriber.next(message);
      });

      return () => {
        this.socket.off('message-sent');
      };
    });
  }

  onTyping(callback: (data: any) => void): void {
    this.socket.on('user-typing', callback);
  }

  onStopTyping(callback: (data: any) => void): void {
    this.socket.on('user-stop-typing', callback);
  }

  removeListener(event: string): void {
    this.socket.off(event);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  on<T = any>(event: string, callback: (data: T) => void): void {
    this.socket.on(event, callback);
  }

  off(event: string): void {
    this.socket.off(event);
  }

  getSocket(): Socket {
    return this.socket;
  }
}
