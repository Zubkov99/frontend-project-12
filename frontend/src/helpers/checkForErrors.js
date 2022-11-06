import filter from 'leo-profanity';

const censorship = filter.add(filter.getDictionary('ru'));

const errorStatus = {
  notUniqValue: 'The channel name must be a unique value',
  emptyField: 'the channel name should not be empty',
  networkError: 'Network error',
  stopWords: 'Incorrect word',
};

const checkForErrors = (channelName, channels, setError, t) => {
  const duplicatedChannel = channels.find(({ name }) => name === channelName);

  if (channelName.length >= 20 || channelName.length < 3) {
    setError(t('validationFeedback.channelLength'));
    throw new Error(errorStatus.channelLength);
  }
  if (duplicatedChannel) {
    setError(t('validationFeedback.notUniqValue'));
    throw new Error(errorStatus.notUniqValue);
  }
  if (censorship.check(channelName)) {
    setError(t('validationFeedback.stopWords'));
    throw new Error(errorStatus.stopWords);
  }
};

export default checkForErrors;
