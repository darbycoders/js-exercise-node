const http = require('http');
const url = require('url');
const routes = require('./routes');

const app = http.createServer();

app.on("request", (req, res) => {
  
  const pathname = url.parse(req.url, true).pathname;
  if (pathname == '/favicon.ico') { 
    return res.writeHead(404); 
  } else {
    routes(pathname, req, res);
  }
  
});

app.listen(4000, () => {
  console.log(`http server listen on 4000`);
});