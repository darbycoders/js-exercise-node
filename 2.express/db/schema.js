import dbconfig from "../config/database.js";

dbconfig.query(`DROP TABLE IF EXISTS board;`);

dbconfig.query(`CREATE TABLE board (
  bo_no int(11) NOT NULL AUTO_INCREMENT,
  bo_subject varchar(255) NOT NULL default '',
  bo_insert_content text NOT NULL,
  created_at datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (bo_no)) ENGINE=MyISAM DEFAULT CHARSET=utf8;`, (err) => {
});

dbconfig.query(`DROP TABLE IF EXISTS member;`);

dbconfig.query(`CREATE TABLE member (
  mb_no int(11) NOT NULL AUTO_INCREMENT,
  mb_id varchar(20) NOT NULL default '',
  mb_password varchar(255) NOT NULL default '',
  mb_name varchar(255) NOT NULL default '',
  mb_nick varchar(255) NOT NULL default '',
  mb_email varchar(255) NOT NULL default '',
  mb_hp varchar(255) NOT NULL default '',
  created_at datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (mb_no),
  UNIQUE KEY mb_id (mb_id)) ENGINE=MyISAM DEFAULT CHARSET=utf8;`
);

console.log("Success: Database Created!");

dbconfig.end();
