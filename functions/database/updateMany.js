const loadData = require("../util/loadData.js");
const saveData = require("../util/saveData.js");

const Query = require("../../core/query.js");
const Operators = require("../../core/operators.js");

function updateMany(fileName, { query }, updates) {
  const database = loadData(fileName);

  const matchingIds = Object.keys(database).filter((key) => Query(database[key], query));

  if (matchingIds.length === 0) {
    throw new Error("Nenhum item encontrado que corresponda à consulta.");
  }

  const formattedUpdates = {};
  for (const key in updates) {
    if (typeof updates[key] === "object" && !Array.isArray(updates[key])) {
      formattedUpdates[key] = updates[key];
    } else {
      formattedUpdates.set = { ...updates };
      break;
    }
  }

  for (const id of matchingIds) {
    for (const operation in formattedUpdates) {
      const changes = formattedUpdates[operation];
      for (const path in changes) {
        Operators(database[id], path, changes[path], operation);
      }
    }
  }

  saveData(fileName, database);
}

module.exports = updateMany;