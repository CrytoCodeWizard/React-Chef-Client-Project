export const selectAppLoading = (state) => state.appState.loading;
export const selectMessage = (state) => state.appState.message;
export const selectCurrentDate = (reduxState) => {
  return reduxState.appState.currentDate;
};

export const getSelectedDate = (reduxState) => {
  return reduxState.appState.selectedDate;
};
