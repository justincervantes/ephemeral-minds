import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export function updateUser(user) {
  console.log(user);
  console.log(apiEndpoint);

  return http.patch(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
    imageUrl: user.imageUrl,
  });
}
