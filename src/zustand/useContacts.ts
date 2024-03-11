import {create} from 'zustand';

type Contact = {
  recordID: string;
  // Другие свойства контакта
};

type ContactStore = {
  contactList: Contact[];
  setContactList: (contacts: Contact[]) => void;
  updateContact: (updatedContact: Contact) => void;
};

const useContactStore = create<ContactStore>(set => ({
  contactList: [],
  setContactList: contacts => set({contactList: contacts}),
  updateContact: updatedContact =>
    set(state => ({
      contactList: state.contactList.map(contact =>
        contact.recordID === updatedContact.recordID ? updatedContact : contact,
      ),
    })),
}));

export default useContactStore;
