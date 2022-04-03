const fs = require('fs');
const ejs = require('ejs');

class Home {
  static index(req, res) {
    fs.readFile('views/index.ejs', 'utf-8', function(error, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(ejs.render(data));
    });
  }
}

module.exports = Home;