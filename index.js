const http = require('http');
const { logRequest } = require('./logger');
const { getPostData } = require('./utils/fileOperations');
const { readAll, readArticle } = require('./handlers/articles/article-read');
const { createArticle } = require('./handlers/articles/article-create');
const { updateArticle } = require('./handlers/articles/article-update');
const { createComment } = require('./handlers/comments/comment-create');
const { deleteArticle } = require('./handlers/articles/article-delete');
const { deleteComment } = require('./handlers/comments/comment-delete');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
  try {
    let body = null;

    if (req.method === 'POST' || req.method === 'PUT') {
      body = await getPostData(req);
    }

    logRequest(req, body);

    if (req.url === '/api/articles/readall' && req.method === 'GET') {
      return readAll(req, res);
    } else if (req.url === '/api/articles/read' && req.method === 'POST') {
      return readArticle(req, res);
    } else if (req.url === '/api/articles/create' && req.method === 'POST') {
      return createArticle(req, res);
    } else if (req.url === '/api/articles/update' && req.method === 'PUT') {
      return updateArticle(req, res);
    } else if (req.url === '/api/comments/create' && req.method === 'POST') {
      return createComment(req, res);
    } else if (req.url === '/api/articles/delete' && req.method === 'DELETE') {
      return deleteArticle(req, res);
    } else if (req.url === '/api/comments/delete' && req.method === 'DELETE') {
      return deleteComment(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
  } catch (error) {
    console.error('Error handling request:', error.message);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
