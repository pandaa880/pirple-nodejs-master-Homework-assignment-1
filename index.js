const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const server = http.createServer((req, res) => {

  const parsedURL = url.parse(req.url, true);

  //get the path
  const trimmedPath = parsedURL.pathname.replace(/^\/+|\/+$/g, '');

  // get the queryString
  const queryStringObject = parsedURL.query;

  let userName = queryStringObject['name'] || queryStringObject['Name'];

  if (userName === undefined || userName === '') {
    userName = 'User';
  }

  // get the method
  const method = req.method;

  // get the headers
  const headers = req.headers;

  // get the payload if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    // choose the handler
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // construct the data
    const sendData = {
      message: `Hello ${userName}. Welcome to our service.`,
    }

    // route requests
    chosenHandler(sendData, (statusCode, payload) => {
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      payload = typeof(payload) === 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      // return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log(`Returning this response :  ${buffer}`);
    });
  });

});

server.listen(3000, () => console.log('Server is running on port 3000'));

// handlers
const handlers = {};

// hello handler
handlers.hello = (data, callback) => {
  callback(200, data);
};

// not found handler
handlers.notFound = (data, callback) => {
  callback(404, {message: 'Sorry, requested route doesn\'t exist'});
};

// router
const router = {
  hello: handlers.hello
}