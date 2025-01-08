const loadData = require("../loadData.js");

const get = (fileName, id, keys) => {
  if (!id) throw new Error('O identificador é obrigatório para a função "get".');

  const database = loadData(fileName);

  if (!database[id]) {
    throw new Error(`Nenhum item encontrado com o identificador "${id}".`);
  }

  const data = database[id];

  if (!keys) return data;

  const keysArray = keys.split(".");
  let result = data;

  for (const key of keysArray) {
    if (result[key] === undefined) {
      throw new Error(`Propriedade "${key}" não encontrada em "${keys}".`);
    }
    result = result[key];
  }

  return result;
};

module.exports = get;