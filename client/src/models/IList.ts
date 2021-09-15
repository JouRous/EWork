import { ITicket } from './ITicket';

export interface IList {
  id: string;
  name: string;
  tickets: ITicket[];
}
