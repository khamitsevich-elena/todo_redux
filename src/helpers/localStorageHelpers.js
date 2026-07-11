const TOKEN = "token";
const localStorageHelpers = {
  get: () => localStorage.getItem(TOKEN),
  set: (data) => localStorage.setItem(TOKEN, data),
  delete: () => localStorage.removeItem(TOKEN),
  isAuthorized: () => !!localStorageHelpers.get(),
};

export { localStorageHelpers };
