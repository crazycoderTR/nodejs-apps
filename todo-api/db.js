"use strict";
/* ---------------- Variable Definition ---------------- */
const Sequelize = require('sequelize');
const sequelize = new Sequelize('todo_api', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
/* ---------------- Variable Definition ---------------- */

const db = {};
db.Todo = sequelize.import('./models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;