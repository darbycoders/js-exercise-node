const fs = require('fs');
const url = require('url');
const ejs = require('ejs');
const BoardModel = require('../models/Board');

class BoardController {
  static index(_, res) {
    BoardModel.index((data, result)=> {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(ejs.render(data,{
        result: result
      }));
    });
  }
  static detail(req, res) {
    let queryData = url.parse(req.url, true).query;
    BoardModel.detail(queryData, (data, result)=> {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(ejs.render(data,{
        result: result[0]
      }));
    });
  }
  static create(req, res) {
    if (req.method === "GET") {
      fs.readFile('views/board/create.ejs', 'utf-8', function(error, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(ejs.render(data));
      });
    } else if (req.method === "POST") {
      BoardModel.create_process(req, ()=> {
        res.writeHead(302, {Location: "/board"});
        res.end();
      });
    }
  }
  static update(req, res) {
    let queryData = url.parse(req.url, true).query;
    if (req.method === "GET") {
      BoardModel.update(queryData, (data, result) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(ejs.render(data,{
          result: result[0],
        }));
      });
    } else if (req.method === "POST") {
      BoardModel.update_process(req, (board) => {
        res.writeHead(302, {Location: `/board/detail?bo_no=${board.bo_no}`});
        res.end();
      });
    }
  }
  static delete(req, res) {
    let queryData = url.parse(req.url, true).query;
    BoardModel.delete(req, queryData, ()=>{
      res.writeHead(302, {Location: "/board"});
      res.end();
    })
  }
}

module.exports = BoardController;