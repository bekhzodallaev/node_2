
function validateArticleData(data) {
  const errors = [];

  if (
    !data.title ||
    typeof data.title !== 'string' ||
    data.title.trim() === ''
  ) {
    errors.push('Title is required and must be a non-empty string.');
  }

  if (!data.text || typeof data.text !== 'string' || data.text.trim() === '') {
    errors.push('Text is required and must be a non-empty string.');
  }

  if (!data.date || isNaN(Date.parse(data.date))) {
    errors.push('A valid date is required.');
  }

  if (
    !data.author ||
    typeof data.author !== 'string' ||
    data.author.trim() === ''
  ) {
    errors.push('Author is required and must be a non-empty string.');
  }

  if (data.comments) {
    if (!Array.isArray(data.comments)) {
      errors.push('Comments should be an array.');
    } else {
      data.comments.forEach((comment, index) => {
        if (
          !comment.text ||
          typeof comment.text !== 'string' ||
          comment.text.trim() === ''
        ) {
          errors.push(`Comment at index ${index} must have a non-empty text.`);
        }
      });
    }
  }

  return errors.length > 0 ? errors : null;
}

module.exports = validateArticleData;
