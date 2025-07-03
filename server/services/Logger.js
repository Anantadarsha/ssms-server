const fs = require("fs");
const path = require("path");

function log(message) {
  const date = new Date();
  const folder = path.join(__dirname, "logs");

  if(!fs.existsSync(folder)){
    fs.mkdirSync(folder);
  }

  const fileName = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.log`;
  const filePath = path.join(folder, fileName);

  const timestamp = date.toISOString();
  const logMessage = `[${timestamp}]: ${message} \n`;

  fs.appendFile(filePath, logMessage, (err) => {});

}

module.exports = log;
