const loadData = require("../loadData.js");
const saveData = require("../saveData.js");

const del = (id) => {
	if (!id) throw new Error('O identificador é obrigatória para a função "delete".');
	const database = loadData();

	if (!(id in database)) throw new Error(`Nenhum item encontrado com o identificador "${id}" para deletar.`);
	delete database[id];

	saveData(database);
};

module.exports = del