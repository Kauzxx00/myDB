const loadData = require("../util/loadData.js");
const saveData = require("../util/saveData.js");

function getNestedArray(obj, path) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (i === keys.length - 1) {
      if (!Array.isArray(current[key])) {
        throw new Error(`"${path}" não é um array ou não existe.`);
      }

      return current[key];
    }

    if (!current[key]) {
      throw new Error(`Caminho "${path}" não encontrado.`);
    }

    current = current[key];
  }
}

function pull(fileName, id, values) {
  if (!id || typeof values !== "object" || Array.isArray(values)) {
    throw new Error("ID e objeto de atualização são obrigatórios.");
  }

  const database = loadData(fileName);
  if (!database[id]) {
    throw new Error(`Nenhum item encontrado com o ID "${id}".`);
  }

  for (let path in values) {
    const array = getNestedArray(database[id], path);

    const valueToRemove = values[path];
    const index = array.indexOf(valueToRemove);
    if (index === -1) {
      throw new Error(`Valor "${valueToRemove}" não encontrado no array "${path}".`);
    }
    array.splice(index, 1);
  }

  saveData(fileName, database);
}

module.exports = pull;