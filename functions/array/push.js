const loadData = require("../loadData.js");
const saveData = require("../saveData.js");

// Função para acessar ou criar arrays em objetos aninhados
function getNestedArray(obj, path) {
	const keys = path.split(".");
	let current = obj;

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];

		if (i === keys.length - 1) {
			if (!Array.isArray(current[key])) {
				current[key] = [];
			}
			
			return current[key];
		}

		if (!current[key]) {
			current[key] = {};
		}
		
		current = current[key];
	}
}

// Função principal para adicionar valores a arrays
function push(fileName, id, values) {
	if (!id || typeof values !== "object" || Array.isArray(values)) {
		throw new Error("ID e objeto de atualização são obrigatórios.");
	}

	const database = loadData(fileName);
	if (!database[id]) {
		throw new Error(`Nenhum item encontrado com o ID "${id}".`);
	}

	for (let path in values) {
		const array = getNestedArray(database[id], path);
		array.push(values[path]);
	}

	saveData(fileName, database);
}

module.exports = push;