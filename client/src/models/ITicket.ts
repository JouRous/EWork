import { IMoveable } from './IMoveable';

export interface ITicket extends IMoveable {
  id: string;
  name: string;
  listId: string;
}
