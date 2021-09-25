import { FC } from 'react';
import { useAppSelector } from 'store/hooks';
import styled from 'styled-components';

const CardTitle = styled.div``;

export const TicketDetail: FC = () => {
  const cardId = useAppSelector((state) => state.ticket.ticketId);
  const isOpen = useAppSelector((state) => state.ticket.isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{ zIndex: 999 }}
      className="h-screen w-screen  fixed top-0 left-0 grid place-items-center"
    >
      <CardTitle>{cardId}</CardTitle>
    </div>
  );
};
