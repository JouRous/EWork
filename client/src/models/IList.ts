import { IMoveable } from './IMoveable';
import { ITicket } from './ITicket';

export interface IList extends IMoveable {
  id: string;
  name: string;
  tickets: ITicket[];
}
