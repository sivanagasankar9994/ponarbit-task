import { API } from "../config";

export const getUsers = () => {
  return fetch(`${API}/users.json`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
