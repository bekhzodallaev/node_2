const http = require('http');
const { readAll, readArticle } = require('./handlers/articles/article-read');
const { createArticle } = require('./handlers/articles/article-create');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  if (req.url === '/api/articles/readall' && req.method === 'GET') {
    readAll(req, res);
  } else if (req.url === '/api/articles/read' && req.method === 'POST') {
    readArticle(req, res);
  } else if (req.url === 'api/articles/create' && req.method === 'POST') {
    createArticle(req, res);
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
