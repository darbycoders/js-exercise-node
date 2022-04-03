const db = require('./db');

db.connect((err) => {
  if (err) throw err;

  db.query(`CREATE TABLE board (
    bo_no int(11) NOT NULL auto_increment,
    bo_subject varchar(255) NOT NULL DEFAULT '',
    bo_insert_content text NOT NULL,
    created_at datetime NOT NULL,
    PRIMARY KEY (bo_no)) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`, (err) => {
    });

  db.end()
});