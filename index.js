const create = require('./functions/database/create');
const updateMany = require('./functions/database/updateMany');
const get = require('./functions/database/get');
const del = require('./functions/database/delete');

const push = require('./functions/array/push');
const pull = require('./functions/array/pull');

class MyDB {
  constructor(fileName = "myDatabase.json") {
    if (!fileName) throw new Error("O nome do arquivo é obrigatório.");
    this.fileName = fileName.endsWith(".json") ? fileName : `${fileName}.json`;

    this.create = (id, data) => create(this.fileName, id, data);
    this.updateMany = (query, updates) => updateMany(this.fileName, query, updates);
    this.get = (id, keys) => get(this.fileName, id, keys);
    this.delete = (id) => del(this.fileName, id);
    
    this.push = (id, value) => push(this.fileName, id, value);
    this.pull = (id, value) => pull(this.fileName, id, value);
  }
}

module.exports = { MyDB };