import dbconfig from '../config/database.js';
import { multipleColumnSet } from '../utils/common.js';

class BoardModel {
  tableName = 'board';

  find = (params = {}) => {
    let sql = `SELECT * from ${this.tableName}`;

    if (!Object.keys(params).length) {
      return dbconfig.query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;


    return dbconfig.query(sql, [...values]);
  }

  findOne = (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * from ${this.tableName}
    WHERE ${columnSet}`;

    return dbconfig.query(sql, [...values]);
  }

  create = ({ bo_subject, bo_insert_content }) => {
    const sql = `INSERT into ${this.tableName}
    (bo_subject, bo_insert_content, created_at) values (?, ?, NOW())`;

    return dbconfig.query(sql, [bo_subject, bo_insert_content])
  }

  update = (params, bo_no) => {
    const { columnSet, values } = multipleColumnSet(params);
    
    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE bo_no = ?`;

    return dbconfig.query(sql, [...values, bo_no]);
  }

  delete = (bo_no) => {
    const sql = `DELETE from ${this.tableName}
    WHERE bo_no = ?`;

    return dbconfig.query(sql, [bo_no]);
  }
}

export default new BoardModel;