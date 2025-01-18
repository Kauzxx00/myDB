const loadData = require("../util/loadData.js");
const saveData = require("../util/saveData.js");

const del = (fileName, id) => {
  if (!id) throw new Error('O identificador é obrigatório para a função "delete".');
  
  const database = loadData(fileName);

  if (!database[id]) {
    throw new Error(`Nenhum item encontrado com o identificador "${id}" para deletar.`);
  }

  delete database[id];
  saveData(fileName, database);
};

module.exports = del;