import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_DATABASE,
}

class DBConnection {
  constructor() {
    this.dbconfig = mysql.createConnection(options);
    this.checkConnection();
  }
  checkConnection() {
    this.dbconfig.connect((err, connection) => {})
  }
  query = (sql, values) => {
    return new Promise((resolve, reject) => {
      const callback = (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
      }
      // execute will internally call prepare and query
      this.dbconfig.query(sql, values, callback);
    }).catch(err => {
      
    });
  }
  end() {
    this.dbconfig.end();
  }
}

export default new DBConnection;
