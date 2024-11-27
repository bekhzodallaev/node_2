
function validateCommentData(data) {
  const errors = [];

  if (!data.articleId || typeof data.articleId !== 'number') {
    errors.push('Valid articleId is required.');
  }

  if (!data.text || typeof data.text !== 'string' || data.text.trim() === '') {
    errors.push('Text is required and must be a non-empty string.');
  }

  if (
    !data.author ||
    typeof data.author !== 'string' ||
    data.author.trim() === ''
  ) {
    errors.push('Author is required and must be a non-empty string.');
  }

  if (data.date && isNaN(Date.parse(data.date))) {
    errors.push('If provided, date must be a valid date.');
  }

  return errors.length > 0 ? errors : null;
}

module.exports = validateCommentData;
