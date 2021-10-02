import { IMoveable } from './IMoveable';

export interface ITicket extends IMoveable {
  id: string;
  title: string;
  description: string;
  listId: string;
}
