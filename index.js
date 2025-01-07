const create = require('./functions/database/create');
const update = require('./functions/database/update');
const get = require('./functions/database/get');
const del = require('./functions/database/delete');
const push = require('./functions/array/push');

class MyDB {
  constructor(fileName = "myDatabase.json") {
    if (!fileName) throw new Error("O nome do arquivo é obrigatório.");
    this.fileName = fileName.endsWith(".json") ? fileName : `${fileName}.json`;

    this.create = (key, data) => create(this.fileName, key, data);
    this.update = (key, updates) => update(this.fileName, key, updates);
    this.get = (key) => get(this.fileName, key);
    this.delete = (key) => del(this.fileName, key);
    this.push = (key, value) => push(this.fileName, key, value);
  }
}

module.exports = { MyDB };