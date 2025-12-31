import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/featureRequests";

export function sendFeatureRequest(content) { 
  return http.post(apiEndpoint, {
    feature: content
  });
}
