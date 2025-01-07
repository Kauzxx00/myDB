const loadData = require("../loadData.js");

const get = (fileName, id) => {
  if (!id) throw new Error('O identificador é obrigatório para a função "get".');
  
  const database = loadData(fileName);

  if (!database[id]) {
    throw new Error(`Nenhum item encontrado com o identificador "${id}".`);
  }

  return database[id];
};

module.exports = get;