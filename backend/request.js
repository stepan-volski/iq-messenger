import http from 'http';

export function request(options) {
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
