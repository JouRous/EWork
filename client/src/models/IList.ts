import { IMoveable } from './IMoveable';
import { ITicket } from './ITicket';

export interface IList extends IMoveable {
  id: string;
  title: string;
  tickets: ITicket[];
}
