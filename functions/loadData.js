const fs = require("fs-extra");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

const loadData = () => {
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({}));
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
};

module.exports = loadData;