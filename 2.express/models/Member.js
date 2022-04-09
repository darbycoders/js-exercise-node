import dbconfig from '../config/database.js';
import { multipleColumnSet } from '../utils/common.js';

class MemberModel {
  tableName = 'member';

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
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `SELECT * from ${this.tableName}
    WHERE ${columnSet}`;

    return dbconfig.query(sql, [...values]);
  }

  create = ({
    mb_id, mb_password, mb_name, mb_nick, mb_email, mb_hp
  }) => {
    const sql = `INSERT into ${this.tableName}
    (mb_id,
    mb_password,
    mb_name,
    mb_nick,
    mb_email,
    mb_hp,
    created_at) values (?,?,?,?,?,?,NOW())`;

    return dbconfig.query(sql, [mb_id, mb_password, mb_name, mb_nick, mb_email, mb_hp]);
  }

  update = (params) => {
    const { columnSet, values } = multipleColumnSet(params);
    
    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE mb_no = ?`;

    return dbconfig.query(sql, [...values, mb_no]);
  }

  delete = () => {
    const sql = `DELETE from ${this.tableName}
    WHERE mb_no = ?`;

    return dbconfig.query(sql, [mb_no]);
  }
}

export default new MemberModel;