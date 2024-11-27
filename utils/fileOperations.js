const fs = require('fs');
const path = require('path');

function writeDataToFile(filename, content) {
  try {
    const filePath = path.isAbsolute(filename)
      ? filename
      : path.join(__dirname, filename);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing to file ${filename}:`, err.message);
    throw new Error('Failed to write data to file');
  }
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
