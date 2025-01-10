const fs = require("fs-extra");
const path = require("path");

const loadData = (fileName) => {
  const folderPath = path.resolve(process.cwd(), "myDB");
  const filePath = path.join(folderPath, fileName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
  
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

module.exports = loadData;