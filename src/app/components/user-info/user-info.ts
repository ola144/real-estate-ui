import { Component, Input, signal } from '@angular/core';
import { Chat } from '../../data/chat';

@Component({
  selector: 'app-user-info',
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  // ============================================================
  // SELECTED CHAT
  // ============================================================

  @Input() selectedChat!: Chat;
}
