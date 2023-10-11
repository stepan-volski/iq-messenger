import { request } from '../request.js';

const PORT_API = 4000;

export function get(host, path) {
  const options = {
    host,
    port: PORT_API,
    path,
    method: 'GET',
  };

  return request(options);
}

export function remove(host, path, id) {
  const options = {
    host,
    port: PORT_API,
    path: `${path}/${id}`,
    method: 'DELETE',
  };

  return request(options);
}

export function post(host, path, message) {
  const options = {
    host,
    port: PORT_API,
    path,
    method: 'POST',
    postData: message,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return request(options);
}