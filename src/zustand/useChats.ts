import {create} from 'zustand';

interface Chat {
  _id: string;
  participants: string[];
  messages: string[];
  participantDetails: {
    user: string;
    _id: string;
    photo?: string;
    fullName?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastMessage: string;
}

interface ChatsState {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  addChat: (chat: Chat) => void;
}

const useChats = create<ChatsState>(set => ({
  chats: [],
  setChats: chats => set({chats}),
  addChat: chat => set(state => ({chats: [...state.chats, chat]})),
}));

export default useChats;
