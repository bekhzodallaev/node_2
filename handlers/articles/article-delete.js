const Articles = require('../../data/articles.json');
const { getPostData, writeDataToFile } = require('../../utils/fileOperations');

function remove(id) {
  return new Promise((resolve, reject) => {
    const filteredArticles = Articles.filter((p) => p.id !== id);
    if (process.env.NODE_ENV !== 'test') {
      writeDataToFile('../data/articles.json', filteredArticles);
    }
    resolve(filteredArticles);
  });
}
async function deleteArticle(req, res) {
  try {
    const body = await getPostData(req);
    const { id } = JSON.parse(body);
    const article = Articles.find((article) => article.id === id);

    if (!article) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Article Not Found' }));
    } else {
      await remove(id);
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
  deleteArticle,
};
