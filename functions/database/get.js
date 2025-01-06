const loadData = require("../loadData.js");
const saveData = require("../saveData.js");

const get = (id) => {
	if (!id) throw new Error('O identificador é obrigatória para a função "get".');
	const database = loadData();

	if (!(id in database)) throw new Error(`Nenhum item encontrado com o identificador "${id}".`);
	return database[id];
};

module.exports = get;