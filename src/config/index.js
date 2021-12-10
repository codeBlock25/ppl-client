export const isDev = process.env["NODE_ENV"] === "development";
export const _localApiUrl = "http://localhost:4000/api";
export const _liveApiUrl = "https://ppl-server-api.herokuapp.com/api";
export const apiUrl = isDev ? _localApiUrl : _liveApiUrl;
