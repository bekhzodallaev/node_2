// handlers/articles/article-update.js
const { getPostData, writeDataToFile } = require('../../utils/fileOperations');
const validateArticleData = require('../../validators/articleValidator');
let Articles = require('../../data/articles.json');

async function updateArticle(req, res) {
  try {
    const body = await getPostData(req);
    const { id, title, text, date, author, comments } = JSON.parse(body);

    const validationErrors = validateArticleData({
      id,
      title,
      text,
      date,
      author,
      comments,
    });

    if (validationErrors) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(
        JSON.stringify({
          message: 'Validation failed',
          errors: validationErrors,
        })
      );
    }

    const articleIndex = Articles.findIndex((article) => article.id === id);

    if (articleIndex === -1) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Article Not Found' }));
    } else {
      Articles[articleIndex] = {
        ...Articles[articleIndex],
        title: title || Articles[articleIndex].title,
        text: text || Articles[articleIndex].text,
        date: date || Articles[articleIndex].date,
        author: author || Articles[articleIndex].author,
        comments: comments || Articles[articleIndex].comments,
      };

      writeDataToFile('../data/articles.json', Articles);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(Articles[articleIndex]));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Internal Server Error' }));
  }
}

module.exports = {
  updateArticle,
};
