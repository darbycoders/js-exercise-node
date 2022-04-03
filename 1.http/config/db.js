const mysql = require('mysql');
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "dev",
  password: "1234",
  database: "js_exercise_node",
});

module.exports = db;
