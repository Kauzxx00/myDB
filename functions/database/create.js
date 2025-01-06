const loadData = require("../loadData.js");
const saveData = require("../saveData.js");

const create = (id, data = {}) => {
	if (!id || typeof data !== "object" || Array.isArray(data)) {
		throw new Error('Um identificar e um objeto válido são obrigatórios para a função "create".');
	}

	const database = loadData();
	if (database[id]) {
		throw new Error(`Item com o identificador "${id}" já existe!`);
	}

	database[id] = data;
	saveData(database);
};

module.exports = create;