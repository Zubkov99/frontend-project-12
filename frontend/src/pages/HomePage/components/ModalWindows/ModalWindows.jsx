import React from 'react';
import { useSelector } from 'react-redux';
import AddModalChannelWindow from './AddModalChannelWindow';
import RemoveChannelModal from './RemoveChannelModal';
import EditModalWindow from './EditModalWindow';
import { getActiveModal } from '../../../../slices/modalWindows';

const modals = {
  addingModal: AddModalChannelWindow,
  removeModal: RemoveChannelModal,
  editModal: EditModalWindow,
};

const getModal = (modalName) => modals[modalName];

const ModalWindows = () => {
  const activeModal = useSelector(getActiveModal);
  const Component = getModal(activeModal);
  return activeModal ? <Component /> : null;
};

export default ModalWindows;
