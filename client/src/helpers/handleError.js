const handleError = errObj => {
  let errorMsg = 'Something went wrong';
  if (errObj.response && errObj.response.status !== 500) {
    errorMsg = errObj.response.data.error;
  }
  return errorMsg;
};

export default handleError;
