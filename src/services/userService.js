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
  return http.patch(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
    imageUrl: user.imageUrl,
  });
}

export async function getImageUrl() {
  const request = await http.get(`${apiEndpoint}/imageUrl`);
  const response = request.data;
  return response;
};

