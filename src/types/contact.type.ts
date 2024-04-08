export interface Contact {
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
  phoneNumbers: {type: string}[];
  postalAddresses: string[];
  prefix: string | null;
  rawContactId: string;
  recordID: string;
  suffix: string | null;
  thumbnailPath: string;
  urlAddresses: string[];
}
