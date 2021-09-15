import { IBoard } from 'models/IBoard';

export const mockData: IBoard = {
  id: '123123',
  name: 'Board 1',
  lists: [
    {
      id: '123',
      name: 'List 1',
      tickets: [
        {
          id: 'ticket1',
          name: 'Ticket 1',
        },
        {
          id: 'ticket2',
          name: 'Ticket 2',
        },
      ],
    },
    {
      id: '234',
      name: 'List 2',
      tickets: [
        {
          id: 'ticket3',
          name: 'Ticket 3',
        },
        {
          id: 'ticket4',
          name: 'Ticket 4',
        },
      ],
    },
  ],
};
