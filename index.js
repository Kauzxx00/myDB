const create = require('./functions/database/create');
const update = require('./functions/database/update');
const get = require('./functions/database/get');
const del = require('./functions/database/delete');

const push = require('./functions/array/push');

const db = {
  create,
  update,
  get,
  delete: del,
  push,
};

module.exports = db;