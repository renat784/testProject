import { User } from '../models';

export const mapUser = (dirtyUser: User | null) => {
  if (dirtyUser) {
    const { uid, photoURL, displayName } = dirtyUser;
    return { uid, photoURL, displayName };
  }
  return {} as User;
};
