import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/posts";

export async function saveEntry(data) {
  const result = await http.post(apiEndpoint, data);
  return result;
}

export function getUserEntries(uid) {
  let apiEndpointJournalPost = apiEndpoint + "/" + uid;
  return http.get(apiEndpointJournalPost);
}
