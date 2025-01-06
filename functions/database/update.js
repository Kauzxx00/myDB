const loadData = require("../loadData.js");
const saveData = require("../saveData.js");

// Função para adicionar vaores em objetos
function setNestedValue(obj, path, value) {
  const keys = path.split("=>"); // Divide a chave em partes usando "=>"
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
}

// Função principal para atualizar a database
function update(id, updates) {
  if (!id || typeof updates !== "object" || Array.isArray(updates)) {
    throw new Error("ID e objeto de atualização são obrigatórios.");
  }

  const database = loadData();

  if (!database[id]) {
    throw new Error(`Nenhum item encontrado com o ID "${id}".`);
  }

  // Atualiza cada chave em "updates"
  for (let path in updates) {
    setNestedValue(database[id], path, updates[path]);
  }

  saveData(database);
}

module.exports = update;