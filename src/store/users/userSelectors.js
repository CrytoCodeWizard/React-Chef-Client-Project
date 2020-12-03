export const selectAllChefs = (reduxState) => {
  return reduxState.users.all;
};

export const selectSingleUser = (reduxState) => {
  return reduxState.users.single;
};

export const selectSingleUserTags = (reduxState) => {
  return reduxState.users.single.profile.specializationTags;
};

export const selectSingleUserProfile = (reduxState) => {
  return reduxState.users.single.profile;
};

export const selectSingleUserImage = (reduxState) => {
  return reduxState.users.single.profile.imgUrl;
};

export const selectAvailableDates = (reduxState) => {
  return reduxState.users.single.profile.availableDates;
};
