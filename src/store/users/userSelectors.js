export const selectAllChefs = (reduxState) => {
  return reduxState.users.all;
};

export const selectChef = (reduxState) => {
  return reduxState.users.single;
};

export const selectChefTags = (reduxState) => {
  return reduxState.users.single.profile.specializationTags;
};

export const selectChefProfile = (reduxState) => {
  return reduxState.users.single.profile;
};

export const selectChefImage = (reduxState) => {
  return reduxState.users.single.profile.imgUrl;
};

export const selectAvailableDates = (reduxState) => {
  return reduxState.users.single.profile.availableDates;
};
