import { ITicket } from './ITicket';

export interface IList {
  id: string;
  name: string;
  pos: number;
  tickets: ITicket[];
}
