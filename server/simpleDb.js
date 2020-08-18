const path = require('path');
const lowdb = require('lowdb');
const lodashId = require('lodash-id');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = lowdb(adapter);

db._.mixin(lodashId);
db.defaults({ posts: [], authors: [] }).write();

module.exports = db;
