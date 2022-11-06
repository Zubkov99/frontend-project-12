const errorStatus = {
  notUniqValue: 'The channel name must be a unique value',
  emptyField: 'the channel name should not be empty',
  networkError: 'Network error',
  stopWords: 'Incorrect word',
};

const sendWsData = (socket, data, event, errorHandler) => {
  socket.emit(event, data, (response) => {
    if (response.status !== 'ok') {
      if (errorHandler) errorHandler(errorStatus.networkError);
      throw new Error(errorStatus.networkError);
    }
  });
};

export default sendWsData;
