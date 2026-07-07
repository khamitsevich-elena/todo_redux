const localStorageHelpers = {
  get: () => localStorage.getItem("token"),
  set: (data) => localStorage.setItem("token", data),
  delete: () => localStorage.removeItem("token"),
};

export { localStorageHelpers };
