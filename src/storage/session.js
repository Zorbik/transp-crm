export const startSession = (user) => {
  sessionStorage.setItem("userId", user.userId);
  sessionStorage.setItem("email", user.email);
  sessionStorage.setItem("accessToken", user.accessToken);
};

export const getSession = () => {
  return {
    userId: sessionStorage.getItem("userId"),
    email: sessionStorage.getItem("email"),
    accessToken: sessionStorage.getItem("accessToken"),
  };
};

export const endSession = () => {
  sessionStorage.clear();
};

export const isLoggedIn = () => {
  return getSession().accessToken;
};
