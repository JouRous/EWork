import { IBoard } from './IBoard';

export interface IProject {
  id: string;
  name: string;
  boards: IBoard[];
}
