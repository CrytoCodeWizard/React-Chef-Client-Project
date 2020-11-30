export const selectModal = (reduxState) => {
  return reduxState.messages.modal;
};

export const selectMessages = (reduxState) => {
  return reduxState.messages.all;
};

export const selectMessagesSortedByDate = (reduxState) => {
  return reduxState.messages.all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const newMessageCount = (reduxState) => {
  return reduxState.messages.all.filter((x) => x.new).length;
};

export const selectBookingDate = (reduxState) => {
  return reduxState.messages.bookingDate;
};
