import { IList } from './IList';
import { IUser } from './user';

export interface IBoard {
  id: string;
  name: string;
  lists: IList[];
  members: IUser[];
}
