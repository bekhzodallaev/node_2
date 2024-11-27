const { getPostData, writeDataToFile } = require('../../utils/fileOperations');
const Articles = require('../../data/articles.json');

function remove(commentId) {
  return new Promise((resolve, reject) => {
    let commentFound = false;

    Articles.forEach((article) => {
      const commentIndex = article.comments.findIndex(
        (comment) => comment.id === commentId
      );
      if (commentIndex !== -1) {
        article.comments.splice(commentIndex, 1);
        commentFound = true;
      }
    });

    if (!commentFound) {
      reject(new Error('Comment not found'));
    } else {
      if (process.env.NODE_ENV !== 'test') {
        writeDataToFile('../data/articles.json', Articles);
      }
      resolve();
    }
  });
}

async function deleteComment(req, res) {
  try {
    const body = await getPostData(req);
    const { id } = JSON.parse(body); 

    await remove(id); 

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Comment deleted successfully' }));
  } catch (error) {
    if (error.message === 'Comment not found') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Comment Not Found' }));
    } else {
      console.log(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
  }
}

module.exports = {
  deleteComment,
};
