const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs.txt');

function logRequest(req, body) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    body: body ? JSON.parse(body) : null,
  };

  const formattedLog = JSON.stringify(logEntry, null, 2);

  fs.appendFile(logFilePath, formattedLog + '\n\n', 'utf8', (err) => {
    if (err) {
      console.error('Error writing to log file:', err.message);
    }
  });
}

module.exports = { logRequest };
