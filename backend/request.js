import http from 'http';

const PORT_API = 4000;

export function get() {
  const options = {
    host: 'localhost',
    port: PORT_API,
    path: '/chat',
    method: 'GET',
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
    req.end();
  });
}
