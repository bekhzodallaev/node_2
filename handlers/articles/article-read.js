let Articles = require('../../data/articles.json');
const { getPostData } = require('../../utils/fileOperations');
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(Articles);
  });
}

async function readAll(req, res) {
  try {
    const articles = await findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(articles));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Server Error' }));
  }
}
async function readArticle(req, res) {
  try {
    const body = await getPostData(req);
    const { id } = JSON.parse(body);
    const article = Articles.find((article) => article.id === id);

    if (!article) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Article Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(article));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
}
module.exports = {
  readAll,
  readArticle,
};
