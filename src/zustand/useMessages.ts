import { create } from 'zustand';

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message?: string;
  answerFor?: string;
  uri?: string;
  messageType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MessagesState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  deleteMessage: (messageId: string) => void;
  getMessageById: (messageId: string) => Message | undefined;
}

const useMessages = create<MessagesState>((set, get) => ({
  messages: [],
  setMessages: messages => set({ messages }),
  addMessage: (message: Message) =>
    set({ messages: [...get().messages, message] }),
  deleteMessage: (messageId: string) =>
    set({ messages: get().messages.filter(message => message._id !== messageId) }),
  getMessageById: (messageId: string) =>
    get().messages.find(message => message._id === messageId),
}));

export default useMessages;
