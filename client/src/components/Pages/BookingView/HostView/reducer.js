const reducer = (state, action) => {
  switch (action.type) {
    case 'getInternData':
      return {
        ...state,
        internData: action.value,
        isLoading: { ...state.isLoading, internData: false },
      };
    case 'isInternDataLoading':
      return { ...state, isLoading: { ...state.isLoading, internData: true } };
    case 'accept':
      return {
        ...state,
        bookingStatus: 'accepted',
        visible: false,
        isLoading: { ...state.isLoading, accept: false },
      };
    case 'isAcceptLoading':
      return { ...state, isLoading: { ...state.isLoading, accept: true } };
    case 'reject':
      return {
        ...state,
        bookingStatus: 'rejected',
        visible: false,
      };
    case 'closeModal':
      return {
        ...state,
        visible: false,
        isLoading: { ...state.isLoading, accept: false, reject: false },
      };
    case 'openModal':
      return { ...state, visible: true, overLapping: action.value };
    case 'isError':
      return { ...state, isLoading: {}, error: action.error };
    default:
      throw new Error();
  }
};

export default reducer;
