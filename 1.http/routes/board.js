const BoardController = require('../controllers/Board');

const boardHandle = {}
boardHandle['/board'] = BoardController.index;
boardHandle['/board/detail'] = BoardController.detail;
boardHandle['/board/create'] = BoardController.create;
boardHandle['/board/update'] = BoardController.update;
boardHandle['/board/delete'] = BoardController.delete;

module.exports = boardHandle;