import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/weights";

export async function addNewWeight(weight) {
  // You don't need to send the uid since the server already gets this in the decoded x-auth-token
  const result = await http.post(apiEndpoint, weight);
  return result;
}

export async function getWeightHistory() {
  const result = await http.get(apiEndpoint);
  // Sort the weights by date
  let sortedResultByDate = result.data.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;
    return 0;
  });
  return sortedResultByDate;
}
