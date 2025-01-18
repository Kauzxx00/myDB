const loadData = require("../util/loadData.js");

const get = (fileName, id, keys) => {
  if (!id) {
    throw new Error('O identificador é obrigatório para a função "get".');
  }

  const database = loadData(fileName);

  if (!database[id]) {
    return null;
  }

  const data = database[id];

  if (!keys) return data;

  const keysArray = keys.split(".");
  let result = data;

  for (const key of keysArray) {
    if (result[key] === undefined) {
      return null;
    }
    result = result[key];
  }

  return result;
};

module.exports = get;