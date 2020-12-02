export const selectAllReviews = (reduxState) => {
  return reduxState.reviews.all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};
