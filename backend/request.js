import http from 'http';

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

function request(options) {
  return new Promise((resolve, reject) => {
    const req = http
      .request(options, (resp) => {
        let data = '';
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          resolve(JSON.parse(data));
        });
      })
      .on('error', (err) => {
        reject(err.message);
      });
    req.write(JSON.stringify(options.postData || ''));
    req.end();
  });
}
