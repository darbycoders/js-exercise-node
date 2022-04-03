const home = require('./home');
const board = require('./board');

module.exports = (pathname, req, res) => {
  typeof home[pathname] === 'function' && home[pathname](req, res);
  typeof board[pathname] === 'function' && board[pathname](req, res);
}