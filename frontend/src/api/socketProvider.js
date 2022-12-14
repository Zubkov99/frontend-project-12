import { io } from 'socket.io-client';
import { addMessages } from '../slices/messages';
import { addChannels, setActiveChannel } from '../slices/channels';

const errorStatus = {
  networkError: 'Network error',
};

const socket = io();

const sendWsData = (data, event, errorHandler) => {
  socket.emit(event, data, (response) => {
    if (response.status !== 'ok') {
      if (errorHandler) errorHandler(errorStatus.networkError);
      throw new Error(errorStatus.networkError);
    }
  });
};

const socketProvider = () => ({
  sendMessages(data) {
    sendWsData(data, 'newMessage');
  },
  getMessages(dispatch) {
    socket.on('newMessage', (payload) => {
      dispatch(addMessages(payload));
    });
  },
  sendChannel(data, errorHandler) {
    sendWsData(data, 'newChannel', errorHandler);
  },
  getChannel(dispatch) {
    socket.on('newChannel', (payload) => {
      dispatch(addChannels(payload));
      const { id, author } = payload;
      dispatch(setActiveChannel({
        id, author,
      }));
    });
  },
  deleteChannelGlobal(id) {
    sendWsData(id, 'removeChannel');
  },
  renameChannelGlobal(data, errorHandler) {
    sendWsData(data, 'renameChannel', errorHandler);
  },
});

export default socketProvider;
