const Home = require('../controllers/Home');

const homeHandle = {}
homeHandle['/'] = Home.index;

module.exports = homeHandle;