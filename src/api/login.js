import { localStorageHelpers } from "../helpers/localStorageHelpers";

export const submitLogin = async ({ email, password }, linkTotask) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data1 = await response.json();
    localStorageHelpers.set(data1["access_token"]);
    if (response.ok) {
      linkTotask();
    }
    return data1;
  } catch (error) {
    console.log(error);
  }
};
