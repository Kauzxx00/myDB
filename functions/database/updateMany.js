const loadData = require("../loadData.js");
const saveData = require("../saveData.js");

const Query = require("../../core/query.js");
const Operators = require("../../core/operators.js");

function updateMany(fileName, { query }, updates) {
  const database = loadData(fileName);

  const id = Object.keys(database).find((key) => Query(database[key], query));

  if (!id) {
    throw new Error("Nenhum item encontrado que corresponda à consulta.");
  }

  for (const operation in updates) {
    const changes = updates[operation];
    for (const path in changes) {
      Operators(database[id], path, changes[path], operation);
    }
  }

  saveData(fileName, database);
}

module.exports = updateMany;