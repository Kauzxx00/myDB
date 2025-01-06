const fs = require("fs-extra");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

const saveData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = saveData;