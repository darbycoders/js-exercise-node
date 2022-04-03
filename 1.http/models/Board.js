const fs = require('fs');
const qs = require('querystring');
const db = require('../config/db');

class BoardModel {
  static index(callback) {
    db.query(`SELECT * FROM board ORDER BY bo_no DESC`, (err, result) => {
      fs.readFile('views/board/list.ejs', 'utf-8', function(err, data) {
        callback(data, result);
      });
    });
  }
  static detail(queryData, callback) {
    db.query(`SELECT * FROM board WHERE bo_no=?`, [queryData.bo_no], (err, result) => {
      fs.readFile('views/board/detail.ejs', 'utf-8', function(err, data) {
        callback(data, result);
      });
    });
  }
  static create_process(req, callback) {
    let body = '';
    req.on('data', (data) => {
      body = body + data;
    });
    req.on('end', () => {
      const board = qs.parse(body);
      db.query(`
        INSERT INTO board (bo_subject, bo_insert_content, created_at) VALUES (?, ?, NOW())`,
        [board.bo_subject, board.bo_insert_content],
        (err, result) => {
          if (err) throw err;
          callback(result);
        }
      );
    });
  }
  static update(queryData, callback) {
    db.query(`SELECT * FROM board WHERE bo_no=?`, [queryData.bo_no], (err, result) => {
      fs.readFile('views/board/update.ejs', 'utf-8', function(err, data) {
        callback(data, result);
      });
    });
  }
  static update_process(req, callback) {
    let body = '';
    req.on('data', (data) => {
      body = body + data;
    });
    req.on('end', () => {
      const board = qs.parse(body);
      db.query(`
        UPDATE board SET bo_subject=?, bo_insert_content=? WHERE bo_no=?`,
        [board.bo_subject, board.bo_insert_content, board.bo_no],
        (err, result) => {
          if (err) throw err;
          callback(board);
        }
      );
    });
  }
  static delete(req, queryData, callback) {
    req.on('data', (data) => {});
    req.on('end', () => {
      db.query(`
        DELETE FROM board WHERE bo_no=?`,
        [queryData.bo_no],
        (err, result) => {
          if (err) throw err;
          callback();
        }
      )
    });
  }
}

module.exports = BoardModel;