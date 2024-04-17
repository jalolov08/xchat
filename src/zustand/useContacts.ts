import {create} from 'zustand';

type PhoneNumber = {
  number: string;
  label?: string;
};

export type Contact = {
  recordID: string;
  company: string;
  department: string;
  displayName: string;
  emailAddresses: string[];
  familyName: string;
  givenName: string;
  hasThumbnail: boolean;
  imAddresses: string[];
  isStarred: boolean;
  jobTitle: string;
  middleName: string;
  note: string;
  phoneNumbers: PhoneNumber[];
  postalAddresses: string[];
  prefix: string | null;
  rawContactId: string;
  suffix: string | null;
  thumbnailPath: string;
  urlAddresses: string[];
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
