import { localStorageHelpers } from "../helpers/localStorageHelpers";

export const submiRegistration = async (
  { username, email, password },
  linkToEnter
) => {
  try {
    console.log(`${import.meta.env.VITE_URL}/auth/register`);
    const response = await fetch(`${import.meta.env.VITE_URL}/auth/register`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data1 = await response.json();
    localStorageHelpers.set(data1["access_token"]);
    if (localStorageHelpers.get()) {
      linkToEnter();
    }
    return data1;
  } catch (error) {
    console.log(error);
  }
};
