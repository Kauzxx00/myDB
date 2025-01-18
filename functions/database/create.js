const loadData = require("../util/loadData.js");
const saveData = require("../util/saveData.js");

// Função para adicionar valores em objetos aninhados
const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key] || typeof current[key] !== "object") current[key] = {};
      current = current[key];
    }
  }
};

const create = (fileName, id, data = {}) => {
  if (!id || typeof data !== "object" || Array.isArray(data)) {
    throw new Error('Um identificador e um objeto válido são obrigatórios para a função "create".');
  }

  const database = loadData(fileName);

  if (database[id]) {
    throw new Error(`Item com o identificador "${id}" já existe!`);
  }

  database[id] = {};
  for (const path in data) {
    setNestedValue(database[id], path, data[path]);
  }

  saveData(fileName, database);
};

module.exports = create;