// export interface User {
//   id: string;
//   _id: string;
//   name: string;
//   email: string;
//   photo?: string;
//   role?: string;
// }

import { User } from '../services/auth/auth';

export interface Message {
  id: string;
  conversation: string;
  sender: User | string | any;
  receiver: string;
  content: string;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  _id: string;

  participants: User[];

  lastMessage?: Message | null;

  lastMessageAt?: string | null;

  unreadCount: number;

  createdAt: string;
  updatedAt: string;
}
