const fs = require("fs-extra");
const path = require("path");

const saveData = (fileName, data) => {
  const folderPath = path.join(__dirname, "../myDB");
  const filePath = path.join(folderPath, fileName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = saveData;