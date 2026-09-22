import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Conversation, Message } from '../../models/chat';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  conversations?: Conversation[];
  messages?: Message[];
  unreadCount?: number;
}

const baseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);

  private apiUrl = `${baseUrl}/messages`;

  // Get conversations
  getConversations(): Observable<ApiResponse<Conversation>> {
    return this.http.get<ApiResponse<Conversation>>(`${this.apiUrl}/conversations`);
  }

  // Get messages
  getMessages(conversationId: string | undefined): Observable<ApiResponse<Message>> {
    return this.http.get<ApiResponse<Message>>(`${this.apiUrl}/conversations/${conversationId}`);
  }

  // Create conversation
  createConversation(participantId: string | undefined) {
    return this.http.post(`${this.apiUrl}/conversations`, {
      participantId,
    });
  }

  // Send message
  sendMessage(conversationId: string, receiverId: string | undefined, content: string) {
    return this.http.post<{
      success: boolean;
      message: Message;
    }>(this.apiUrl, {
      conversationId,
      receiverId,
      content,
    });
  }

  // Mark messages as read
  markAsRead(conversationId: string) {
    return this.http.patch(`${this.apiUrl}/conversations/${conversationId}/read`, {});
  }

  // Unread count
  getUnreadCount() {
    return this.http.get<{
      success: boolean;
      unreadCount: number;
    }>(`${this.apiUrl}/unread-count`);
  }
}
