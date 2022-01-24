import { User } from '.';

export interface UserSettings {
  user: User | undefined;
  lastVisitedChat: string;
}
