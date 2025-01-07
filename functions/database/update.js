const loadData = require("../loadData.js");
const saveData = require("../saveData.js");

// Função para adicionar valores em objetos aninhados
const setNestedValue = (obj, path, value) => {
  const keys = path.split("=>");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  }
};

const update = (fileName, id, updates) => {
  if (!id || typeof updates !== "object" || Array.isArray(updates)) {
    throw new Error("ID e objeto de atualização são obrigatórios.");
  }

  const database = loadData(fileName);

  if (!database[id]) {
    throw new Error(`Nenhum item encontrado com o ID "${id}".`);
  }

  for (let path in updates) {
    setNestedValue(database[id], path, updates[path]);
  }

  saveData(fileName, database);
};

module.exports = update;