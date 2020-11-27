export const selectModal = (reduxState) => {
  return reduxState.messages.modal;
};

export const selectMessages = (reduxState) => {
  return reduxState.messages.all;
};
