export const selectAllChefs = (reduxState) => {
  return reduxState.users.all;
};

export const selectChef = (reduxState) => {
  return reduxState.users.single;
};
