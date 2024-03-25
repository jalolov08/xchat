import {create} from 'zustand';

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
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
}

const useMessages = create<MessagesState>(set => ({
  messages: [],
  setMessages: messages => set({messages}),
  addMessage: message => set(state => ({messages: [...state.messages, message]})),
  deleteMessage: messageId => set(state => ({
    messages: state.messages.filter(message => message._id !== messageId)
  })),
}));

export default useMessages;
