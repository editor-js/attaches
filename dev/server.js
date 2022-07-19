/**
 * Sample HTTP server for accept uploaded files
 * [!] Use it only for debugging purposes
 *
 * How to use [requires Node.js 10.0.0+ and npm install]:
 *
 * 1. $ node dev/server.js
 * 2. set 'endpoint' at the Attaches Tools 'config' in example-dev.html
 *   endpoint : 'http://localhost:8008/uploadFile'
 *
 */
const http = require('http');
const formidable = require('formidable');
const crypto = require('crypto');

/**
 * Sample server for files upload
 */
class ServerExample {
  constructor({ port, fieldName }) {
    this.uploadDir = __dirname + '/\.tmp';
    this.fieldName = fieldName;
    this.server = http.createServer((req, res) => {
      this.onRequest(req, res);
    }).listen(port);

    this.server.on('listening', () => {
      console.log('Server is listening ' + port + '...');
    });

    this.server.on('error', (error) => {
      console.log('Failed to run server', error);
    });
  }

  /**
   * Request handler
   * @param {http.IncomingMessage} request
   * @param {http.ServerResponse} response
   */
  onRequest(request, response) {
    this.allowCors(response);

    const { method, url } = request;

    if (method.toLowerCase() !== 'post') {
      response.end();
      return;
    }

    console.log('Got request on the ', url);

    switch (url) {
      case '/uploadFile':
        this.uploadFile(request, response);
        break;
    }
  }

  /**
   * Allows CORS requests for debugging
   * @param response
   */
  allowCors(response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  }

  /**
   * Handles uploading by file
   * @param request
   * @param response
   */
  uploadFile(request, response) {
    let responseJson = {
      success: 0
    };

    this.getForm(request)
      .then(({ files }) => {
        let file = files[this.fieldName] || {};

        responseJson.success = 1;
        responseJson.file = {
          url: file.path,
          name: file.name,
          size: file.size,
        };
      })
      .catch((error) => {
        console.log('Uploading error', error);
      })
      .finally(() => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(responseJson));
      });
  }

  /**
   * Accepts post form data
   * @param request
   * @return {Promise<{files: object, fields: object}>}
   */
  getForm(request) {
    return new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();

      form.uploadDir = this.uploadDir;
      form.keepExtensions = true;

      form.parse(request, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          console.log('fields', fields);
          console.log('files', files);
          resolve({ files, fields });
        }
      });
    });
  }

  /**
   * Generates md5 hash for string
   * @param string
   * @return {string}
   */
  md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
  }
}


new ServerExample({
  port: 8008,
  fieldName: 'file'
});
