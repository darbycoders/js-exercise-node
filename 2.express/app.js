import path from 'path';
import express from 'express';
import expressSession from "express-session";
import expressMySqlSession from "express-mysql-session";
import dotenv from 'dotenv';
import { options } from './config/database.js';
import boardRouter from './routes/board.js';
import memberRouter from './routes/member.js';
import HttpException from './utils/HttpException.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const port = Number(process.env.PORT || 4000);
const sessionHandler = expressSession({
  secret: '12312dajfj23rj2po4$#%@#',
  resave: false,
  saveUninitialized: true,
  store: new expressMySqlSession(options)
})

// Templete
app.use('/static', express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(sessionHandler)
app.use((req, res, next)=>{
  res.locals.session = req.session;
  next();
})
// Routes
app.get('/', (req, res) => {
  res.render('index', {title: 'main'})
}) 
app.use('/board', boardRouter);
app.use('/member', memberRouter);
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next();
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});