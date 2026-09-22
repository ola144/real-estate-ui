export type CallType = 'video' | 'audio' | null;

export interface IMessage {
  id: number;
  sender: 'me' | 'them';
  text?: string;
  time: string;
  images?: string[];
}

export interface Chat {
  id: number | string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
}

export const chatList: Chat[] = [
  {
    id: 1,
    name: 'Jane Cooper',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Hello! Is the apartment still available?',
    time: '9:30 PM',
    unread: 2,
    online: true,
  },

  {
    id: 2,
    name: 'Jacob Anderson',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    lastMessage: 'Thank you for the information.',
    time: '9:15 PM',
    online: true,
  },

  {
    id: 3,
    name: 'Michael Brown',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Can I schedule a viewing?',
    time: '8:40 PM',
  },

  {
    id: 4,
    name: 'Jane Cooper',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    lastMessage: 'That sounds great!',
    time: '8:20 PM',
  },

  {
    id: 5,
    name: 'Hussain Ahmed',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    lastMessage: 'I will send you the details.',
    time: '7:55 PM',
  },

  {
    id: 6,
    name: 'David Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    lastMessage: 'See you tomorrow.',
    time: '7:30 PM',
  },

  {
    id: 7,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    lastMessage: 'The property looks amazing.',
    time: '6:45 PM',
  },

  {
    id: 8,
    name: 'Emily Wilson',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    lastMessage: 'I have a question about the price.',
    time: '6:20 PM',
  },
];

export const messageList: IMessage[] = [
  {
    id: 1,
    sender: 'them',
    text: 'Hi, how are you?',
    time: '9:20 PM',
  },

  {
    id: 2,
    sender: 'me',
    text: 'I am good, thank you. How can I help you?',
    time: '9:21 PM',
  },

  {
    id: 3,
    sender: 'them',
    text: 'I am interested in the apartment you listed.',
    time: '9:23 PM',
  },

  {
    id: 4,
    sender: 'me',
    text: 'Sure. It is still available. Would you like to schedule a viewing?',
    time: '9:25 PM',
  },

  {
    id: 5,
    sender: 'them',
    text: 'Yes, that would be great. Can I come tomorrow?',
    time: '9:27 PM',
  },

  {
    id: 6,
    sender: 'me',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=80',
    ],
    time: '9:28 PM',
  },

  {
    id: 7,
    sender: 'me',
    text: 'Here are some pictures of the property.',
    time: '9:29 PM',
  },

  {
    id: 8,
    sender: 'them',
    text: 'Thank you! The property looks really nice.',
    time: '9:30 PM',
  },
];
