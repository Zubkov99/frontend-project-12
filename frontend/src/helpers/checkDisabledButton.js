const checkDisabledButton = (data) => {
  const errors = Object.keys(data.errors).length !== 0;
  const values = Object.values(data.values).includes('');
  return errors || values;
};

export default checkDisabledButton;
