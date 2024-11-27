const http = require('http');
const { readAll, readArticle } = require('./handlers/articles/article-read');
const { createArticle } = require('./handlers/articles/article-create');
const { updateArticle } = require('./handlers/articles/article-update');
const { createComment } = require('./handlers/comments/comment-create');
const { deleteArticle } = require('./handlers/articles/article-delete');
const { deleteComment } = require('./handlers/comments/comment-delete');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  if (req.url === '/api/articles/readall' && req.method === 'GET') {
    readAll(req, res);
  } else if (req.url === '/api/articles/read' && req.method === 'POST') {
    readArticle(req, res);
  } else if (req.url === '/api/articles/create' && req.method === 'POST') {
    createArticle(req, res);
  } else if (req.url === '/api/articles/update' && req.method === 'PUT') {
    updateArticle(req, res);
  } else if (req.url === '/api/comments/create' && req.method === 'POST') {
    createComment(req, res);
  } else if (req.url === '/api/articles/delete' && req.method === 'DELETE') {
    deleteArticle(req, res);
  } else if (req.url === '/api/comments/delete' && req.method === 'DELETE') {
    deleteComment(req, res);
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
