export const selectModal = (reduxState) => {
  return reduxState.messages.modal;
};

export const selectMessages = (reduxState) => {
  return reduxState.messages.all;
};

export const newMessageCount = (reduxState) => {
  return reduxState.messages.all.filter((x) => x.new).length;
};

export const selectBookingDate = (reduxState) => {
  return reduxState.messages.bookingDate;
};
