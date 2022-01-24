import { User } from '.';

export interface Room {
  user: User | undefined;
  name: string;
  date: Date;
}
