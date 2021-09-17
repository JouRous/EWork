import { IMoveable } from 'models/IMoveable';
import { DraggableLocation } from 'react-beautiful-dnd';
import { getPos } from 'utils';

export const reorder = <T extends IMoveable>(
  list: T[],
  startIndex: number,
  endIndex: number
): [T, T[]] => {
  const newList = [...list];
  const [movedItem] = newList.splice(startIndex, 1);
  newList.splice(endIndex, 0, movedItem);
  const beforeItem = newList[endIndex - 1];
  const afterItem = newList[endIndex + 1];

  switch (endIndex) {
    case 0:
      movedItem.pos = getPos('', afterItem.pos);
      break;
    case newList.length - 1:
      movedItem.pos = getPos(beforeItem.pos, '');
      break;
    default:
      movedItem.pos = getPos(beforeItem.pos, afterItem.pos);
      break;
  }

  return [movedItem, newList];
};

export const moveItem = <T extends IMoveable>(
  source: T[],
  destination: T[],
  sourceLocation: DraggableLocation,
  destLocation: DraggableLocation
): [T, T[], T[]] => {
  const newSource = [...source];
  const newDest = [...destination];
  const [movedItem] = newSource.splice(sourceLocation.index, 1);
  newDest.splice(destLocation.index, 0, movedItem);
  const beforeItem = newDest[destLocation.index - 1];
  const afterItem = newDest[destLocation.index + 1];

  if (destLocation.index === 0) {
    if (newDest.length > 1) {
      movedItem.pos = getPos('', afterItem.pos);
    } else {
      movedItem.pos = getPos('', '');
    }
  } else if (destLocation.index === newDest.length - 1) {
    movedItem.pos = getPos(beforeItem.pos, '');
  } else {
    movedItem.pos = getPos(beforeItem.pos, afterItem.pos);
  }

  return [movedItem, newSource, newDest];
};
