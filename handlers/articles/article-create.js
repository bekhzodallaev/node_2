// handlers/articles/article-create.js
const { getPostData, writeDataToFile } = require('../../utils/fileOperations');
const validateArticleData = require('../../validators/articleValidator');
let articles = require('../../data/articles.json');

async function createArticle(req, res) {
  try {
    const body = await getPostData(req);
    const { title, text, date, author, comments } = JSON.parse(body);
    const validationErrors = validateArticleData({
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

    const newArticleId =
      articles.length > 0 ? articles[articles.length - 1].id + 1 : 1;

    const processedComments = (comments || []).map((comment) => ({
      id: Date.now() + Math.floor(Math.random() * 1000),
      articleId: newArticleId,
      ...comment,
    }));

    const newArticle = {
      id: newArticleId,
      title,
      text,
      date,
      author,
      comments: processedComments,
    };

    articles.push(newArticle);
    writeDataToFile('../data/articles.json', articles);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newArticle));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error creating an article' }));
  }
}

module.exports = {
  createArticle,
};
