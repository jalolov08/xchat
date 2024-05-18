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
  findContactByPhoneNumber: (phoneNumber: string) => Contact | undefined;
};

const useContactStore = create<ContactStore>((set, get) => ({
  contactList: [],
  setContactList: contacts => set({contactList: contacts}),
  updateContact: updatedContact =>
    set(state => ({
      contactList: state.contactList.map(contact =>
        contact.recordID === updatedContact.recordID ? updatedContact : contact,
      ),
    })),
  findContactByPhoneNumber: phoneNumber =>
    get().contactList.find(contact =>
      contact.phoneNumbers.some(phone => phone.number === phoneNumber),
    ),
}));

export default useContactStore;
