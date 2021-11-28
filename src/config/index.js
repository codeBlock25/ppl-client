export const isDev = process.env["NODE_ENV"] === "development";
export const _localApiUrl = "http://localhost:4040/api";
export const _liveApiUrl = "http://ppl_server.herokuapp.com/api";
export const apiUrl = isDev ? _localApiUrl : _liveApiUrl;
