import {create} from 'zustand';

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
  viewed: boolean;
  __v: number;
}

interface MessagesState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  deleteMessages: (messageIds: string[]) => void;
  getMessageById: (messageId: string) => Message | undefined;
  updateMessageById: (messageId: string, updatedMessage: Partial<Message>) => void;
}

const useMessages = create<MessagesState>((set, get) => ({
  messages: [],
  setMessages: messages => set({messages}),
  addMessage: (message: Message) =>
    set({messages: [...get().messages, message]}),
  deleteMessages: (messageIds: string[]) => {
    const updatedMessages = get().messages.filter(
      message => !messageIds.includes(message._id),
    );
    set({messages: updatedMessages});
  },
  getMessageById: (messageId: string) =>
    get().messages.find(message => message._id === messageId),
  updateMessageById: (messageId: string, updatedMessage: Partial<Message>) => {
    const messages = get().messages.map(message => {
      if (message._id === messageId) {
        return {...message, ...updatedMessage};
      }
      return message;
    });
    set({messages});
  },
}));

export default useMessages;
