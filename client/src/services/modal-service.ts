import { Subject } from 'rxjs';

const modalState = new Subject<boolean>();

const getState = () => {
  return modalState.asObservable();
};

const openModal = () => {
  modalState.next(true);
};

const closeModal = () => {
  modalState.next(false);
};

const modalService = {
  getState,
  openModal,
  closeModal,
};

export default modalService;
