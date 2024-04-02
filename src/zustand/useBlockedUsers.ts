import {create} from 'zustand';

interface BlockedUsersState {
  blockedUsers: string[];
}

interface BlockedUsersActions {
  blockUser: (userId: string) => void;
  isUserBlocked: (userId: string) => boolean;
  setBlockedUsers: (users: string[]) => void;
}

interface BlockedUsersStore extends BlockedUsersState, BlockedUsersActions {}

const useBlockedUsers = create<BlockedUsersStore>((set, getState) => ({
  blockedUsers: [],
  blockUser: userId => {
    const {blockedUsers} = getState();
    if (blockedUsers.includes(userId)) {
      set({blockedUsers: blockedUsers.filter(id => id !== userId)});
    } else {
      set({blockedUsers: [...blockedUsers, userId]});
    }
  },
  isUserBlocked: userId => getState().blockedUsers.includes(userId),
  setBlockedUsers: users => set({blockedUsers: users}),
}));

export default useBlockedUsers;
