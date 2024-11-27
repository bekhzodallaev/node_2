const { getPostData, writeDataToFile } = require('../../utils/fileOperations');
const Articles = require('../../data/articles.json');
const validateCommentData = require('../../validators/commentValidator');

async function createComment(req, res) {
  try {
    const body = await getPostData(req);
    const { articleId, text, date, author } = JSON.parse(body);

    const validationErrors = validateCommentData({
      articleId,
      text,
      date,
      author,
    });
    if (validationErrors) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: validationErrors.join(', ') }));
      return;
    }

    const article = Articles.find((article) => article.id === articleId);
    if (!article) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Article Not Found' }));
      return;
    }

    const newCommentId =
      article.comments.length > 0
        ? article.comments[article.comments.length - 1].id + 1
        : 1;

    const newComment = {
      id: newCommentId,
      articleId,
      text,
      date: date || new Date().toISOString(),
      author,
    };

    article.comments.push(newComment);
    writeDataToFile('../data/articles.json', Articles);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newComment));
  } catch (error) {
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error creating a comment' }));
  }
}

module.exports = {
  createComment,
};
