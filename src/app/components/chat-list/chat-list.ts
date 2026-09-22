import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';

import { Conversation } from '../../models/chat';
import { UserService } from '../../services/user';
import { toast } from 'ngx-sonner';
import { User } from '../../services/auth/auth';
import { MessageService } from '../../services/message/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-list',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './chat-list.html',
})
export class ChatList implements OnInit {
  userService = inject(UserService);
  messageService = inject(MessageService);

  conversations = input<Conversation[]>([]);
  currentUserId = input<string | undefined>('');
  conversationSelected = output<Conversation>();
  loadConversation = output<void>();

  showNewChat = signal(false);
  users = signal<User[]>([]);
  searchTerm = signal('');
  isLoadingUsers = signal(false);
  isCreatingConversation = signal(false);

  filteredUsers = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    if (!search) {
      return this.users();
    }

    return this.users().filter(
      (user) =>
        user.name?.toLowerCase().includes(search) || user.email?.toLowerCase().includes(search),
    );
  });

  ngOnInit(): void {
    // console.log(this.conversations());
  }

  openNewChat(): void {
    this.showNewChat.set(true);
    this.searchTerm.set('');

    // Refresh users when opened
    this.loadUsers();
  }

  closeNewChat(): void {
    this.showNewChat.set(false);
    this.searchTerm.set('');
  }

  loadUsers(): void {
    this.isLoadingUsers.set(true);

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users.set(response.users || []);

        this.isLoadingUsers.set(false);
      },

      error: (error) => {
        toast.error('Failed to load users:', error);

        this.isLoadingUsers.set(false);
      },
    });
  }

  selectConversation(conversation: Conversation): void {
    this.conversationSelected.emit(conversation);
  }

  getOtherUser(conversation: Conversation): User | any {
    return conversation.participants.find((user) => user.id !== this.currentUserId());
  }

  startChat(user: User): void {
    if (this.isCreatingConversation()) {
      return;
    }

    this.isCreatingConversation.set(true);

    this.messageService.createConversation(user?.id).subscribe({
      next: (response: any) => {
        if (response.conversation) {
          // Tell parent to select
          // this conversation

          this.conversationSelected.emit(response.conversation);
        }
        this.loadConversation.emit();

        // Close slide panel
        this.closeNewChat();

        this.isCreatingConversation.set(false);
      },

      error: (error) => {
        toast.error('Failed to create conversation:', error.error.message);

        this.isCreatingConversation.set(false);
      },
    });
  }
}
