import { User } from '.';

export interface Message {
  user: User | undefined;
  text: string;
  date: Date;
  roomName: string;
}
