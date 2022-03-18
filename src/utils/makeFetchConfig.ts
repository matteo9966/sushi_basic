type method = "GET" | "POST" | "PATCH" | "DELETE";

let defaultInit: RequestInit = {
  method: "GET",
  mode: "cors",
  cache: "default",
};


export function makeFetchConfig(url: string, init:RequestInit = defaultInit): Request {
  let request: Request;
  request = new Request(url,init);
  return request;
}
