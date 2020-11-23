export const selectAppLoading = (reduxState) => reduxState.appState.loading;
export const selectMessage = (reduxState) => reduxState.appState.message;
export const selectCurrentDate = (reduxState) => {
  return reduxState.appState.currentDate;
};

export const getSelectedDate = (reduxState) => {
  return reduxState.appState.selectedDate;
};
