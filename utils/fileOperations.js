const fs = require('fs');
const path = require('path');

function writeDataToFile(filename, content) {
  const filePath = path.join(__dirname, filename);
  fs.writeFileSync(
    filePath,
    JSON.stringify(content, null, 2),
    'utf8',
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}
function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
