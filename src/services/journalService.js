import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/posts";

export async function modifyEntry(data) {
  console.log(data);
  const result = await http.patch(
    apiEndpoint + "/individual/" + data._id,
    data
  );
  return result;
}

export async function saveEntry(data) {
  const result = await http.post(apiEndpoint, data);
  return result;
}

export function getUserEntries(uid) {
  let apiEndpointJournalPost = apiEndpoint + "/" + uid;
  return http.get(apiEndpointJournalPost);
}

export async function deleteEntry(data) {
  let apiEndpointJournalPost = apiEndpoint + "/delete";
  return http.post(apiEndpointJournalPost, data);
}

export async function viewEntry(_id) {
  let apiEndpointJournalPost = apiEndpoint + "/individual/" + _id;
  return http.get(apiEndpointJournalPost);
}