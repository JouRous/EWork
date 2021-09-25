import { IList } from './IList';
import { IUser } from './user';

export interface IBoard {
  id: string;
  title: string;
  lists: IList[];
  members: IUser[];
}
